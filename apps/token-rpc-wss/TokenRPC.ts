import WebSocket from "ws";
import { MessageResponse, polledData, QueueData, rawData } from "./interfaces/messageInterface";
import {RedisClientType} from "redis";
import { parseMessageResponse } from "./utilities/parseMessageResponse";
import {prisma} from "@repo/database/client";



const EVENT_KEY = process.env.REDIS_EVENT_KEY ?? "events";
const MARKET_CAP_ZSET_PREFIX = process.env.REDIS_MARKET_CAP_ZSET_PREFIX ?? "marketcap";

type ChangeKey =
    | "change_5min"
    | "change_15min"
    | "change_30min"
    | "change_1h"
    | "change_1D"
    | "change_5D"
    | "change_1M"
    | "change_1Y";

const CHANGE_WINDOWS: Array<{ key: ChangeKey; seconds: number }> = [
    { key: "change_5min", seconds: 5 * 60 },
    { key: "change_15min", seconds: 15 * 60 },
    { key: "change_30min", seconds: 30 * 60 },
    { key: "change_1h", seconds: 60 * 60 },
    { key: "change_1D", seconds: 24 * 60 * 60 },
    { key: "change_5D", seconds: 5 * 24 * 60 * 60 },
    { key: "change_1M", seconds: 30 * 24 * 60 * 60 },
    { key: "change_1Y", seconds: 365 * 24 * 60 * 60 },
];

export class TokenRPC{
   private subscribers = new Map<`0x${string}`, Set<WebSocket>>();
   private subscribedAll = new Set<WebSocket>;
   private static singleTon:TokenRPC|null = null;
   private static redisClient: RedisClientType|null;
   private static loopStarted = false;
   private static loopInProgress = false;
   private static loopIntervalMs = Number(process.env.LOOP_INTERVAL_MS) || 3000;
   private totalPoolTokens = Number(process.env.POOL_TOKENS_UNLOCKED) || 800*10**6*10**6;
   private totalTokens = Number(process.env.POOL_TOKENS_TOTAL) || 1*10**9*10**6; 
    
  

    static getTokenRPC(redisClient: RedisClientType){
        if(this.singleTon == null){
            this.singleTon = new TokenRPC();
            this.redisClient = redisClient;
            this.singleTon.init_loop();
        }
        return this.singleTon;
   }

   init_loop(){
        if (TokenRPC.loopStarted) return;
        TokenRPC.loopStarted = true;

        setInterval(async () => {
            if (TokenRPC.loopInProgress) return;
            TokenRPC.loopInProgress = true;

            try {
                const redisClient = TokenRPC.redisClient;
                if (!redisClient) return;

                const coinAddresses = Array.from(this.subscribers.keys());
                if (coinAddresses.length === 0) return;

                await Promise.all(
                    coinAddresses.map(async (coinAddress) => {
                        const raw = await redisClient.hGet(EVENT_KEY, coinAddress);
                        if (!raw) return;
                        console.log("we got some raw: ", raw);
                        
                        let event: QueueData;
                        try {
                            event = JSON.parse(raw) as QueueData;
                        } catch {
                            return;
                        }

                        const message = await parseMessageResponse({
                            token: coinAddress,
                            poolTokens: BigInt(event.poolTokens as unknown as string | number | bigint),
                            poolVETHs: BigInt(event.poolVETHs as unknown as string | number | bigint),
                        });

                        const eventTimestamp = Number(event.blockTimeStamp || Math.floor(Date.now() / 1000));
                        const changes = await TokenRPC.getMarketCapChanges(coinAddress, message.marketCap, eventTimestamp);
                        Object.assign(message, changes);

                        this.broadCast(coinAddress, message);

                        
                        
                    })
                );
            } catch (error) {
                console.error("[TokenRPC] init_loop error", error);
            } finally {
                TokenRPC.loopInProgress = false;
            }
            // const keys = await (TokenRPC.redisClient as RedisClientType).hKeys(EVENT_KEY);
            // console.log(keys);
        }, TokenRPC.loopIntervalMs);
   }

   broadCast(coinAddress: `0x${string}`, message: MessageResponse){
        this.subscribers.get(coinAddress)?.forEach(ws=>{
            if(ws.readyState == ws.OPEN){
                ws.send(JSON.stringify(message));
            }
        })
        console.log("broadcasted ", message);
   }

   subscribe(coinAddress: `0x${string}`, ws:WebSocket){
        let sockets = this.subscribers.get(coinAddress);
        if(!sockets){
            sockets = new Set();
            this.subscribers.set(coinAddress, sockets);
        }
        sockets.add(ws);
   }    

   unsubscribe(coinAddress: `0x${string}`, ws: WebSocket){
        const sockets = this.subscribers.get(coinAddress);
        if(!sockets)return;

        sockets.delete(ws);

        if (sockets.size === 0) {
            this.subscribers.delete(coinAddress);
        }
   }

   subscribeAll(ws: WebSocket){
        this.subscribedAll.add(ws);
   }


   unsubscribeAll(ws:WebSocket){
        this.subscribers.forEach((sockets, coinAddress) => {
            sockets.delete(ws);
            if (sockets.size === 0) {
                this.subscribers.delete(coinAddress);
            }
        });

        this.subscribedAll.delete(ws);
   }

   async updateClients(row:any){
        const parsedMessage = await parseMessageResponse(row);
        const eventTimestamp = Number(row.blockTimestamp ?? Math.floor(Date.now() / 1000));
        TokenRPC.pushMarketCap(row.token, parsedMessage.marketCap, eventTimestamp, row.transactionHash);
        const changes = await TokenRPC.getMarketCapChanges(row.token, parsedMessage.marketCap, eventTimestamp);
        Object.assign(parsedMessage, changes);
        
        this.broadCast(row.token, parsedMessage);
        TokenRPC.pushRedisEvent(row.token, this.parseRedisEvent(row , "sell"));
   }

   static pushRedisEvent(coinAddress: `0x${string}`, event: QueueData ){
    if(!this.redisClient)return;
        this.redisClient.hSet(EVENT_KEY, coinAddress, JSON.stringify(event));
        console.log("pushed to redis ", coinAddress, event);
   }


   private parseRedisEvent(data: polledData, event: "buy"|"sell"): QueueData{
       const parsedEvent: QueueData = {
           event,
           coinAddress: data.token,
           poolTokens: Number(data.poolTokens),
           poolVETHs: Number(data.poolVETHs),
           blockTimeStamp: data.blockTimeStamp
       }
       return parsedEvent;
   }

   static pushMarketCap(
    coinAddress: `0x${string}`,
    marketCap: string,
    timestamp: number,
    txHash?: string
   ) {
    if (!this.redisClient) return;

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress.toLowerCase()}`;
    const value = JSON.stringify({ marketCap, txHash: txHash ?? null });
    this.redisClient.zAdd(key, [{ score: timestamp, value }]);
   }

   private static async getFirstMarketCapInWindow(
    key: string,
    startTimestamp: number,
    endTimestamp: number
   ): Promise<number | null> {
    if (!this.redisClient) return null;

    const rows = await this.redisClient.sendCommand([
        "ZRANGEBYSCORE",
        key,
        startTimestamp.toString(),
        endTimestamp.toString(),
        "LIMIT",
        "0",
        "1",
    ]);

    const member = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!member || typeof member !== "string") return null;

    try {
        const parsed = JSON.parse(member) as { marketCap?: string };
        const cap = Number(parsed.marketCap);
        if (!Number.isFinite(cap) || cap <= 0) return null;
        return cap;
    } catch {
        return null;
    }
   }

   static async getMarketCapChanges(
    coinAddress: `0x${string}`,
    currentMarketCap: string,
    timestamp: number
   ): Promise<Partial<MessageResponse>> {
    const changes: Partial<MessageResponse> = {
        change_5min: 0,
        change_15min: 0,
        change_30min: 0,
        change_1h: 0,
        change_1D: 0,
        change_5D: 0,
        change_1M: 0,
        change_1Y: 0,
    };
    if (!this.redisClient) return changes;

    const current = Number(currentMarketCap);
    if (!Number.isFinite(current) || current <= 0) return changes;

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress.toLowerCase()}`;

    for (const window of CHANGE_WINDOWS) {
        const windowStart = timestamp - window.seconds;
        const baseline = await this.getFirstMarketCapInWindow(key, windowStart, timestamp);
        if (!baseline) continue;

        const pct = ((current - baseline) / baseline) * 100;
        if (!Number.isFinite(pct)) continue;

        changes[window.key] = Number(pct.toFixed(4));
    }

    return changes;
   }

   private  async parseMessageResponse(data: rawData){
     const mc = this.getMarketCap(Number(data.poolTokens), Number(data.poolVETHs));
    const bcprogress = this.getBondingCurveProgress(Number(data.poolTokens));
    const currentPrice = this.getPrice(Number(data.poolTokens), Number(data.poolVETHs));

    let ATHprice = await this.getATHfromRedis(data.token);
    let athPriceRes:any;
    if(!ATHprice){
        athPriceRes = await prisma.coin.findFirst({
        where:{
            address: data.token
        },
        select:{
            // @ts-ignore
            ATHPrice: true
        }
    });


        if(!athPriceRes){
        throw new Error("Coin not found");
        }
        ATHprice = Math.max(Number(athPriceRes.ATHPrice), currentPrice).toString();

        await (TokenRPC.redisClient as RedisClientType).hSet("ATHPrice", data.token, athPriceRes.ATHPrice);
    }
    
    
    // @ts-ignore
    const athProgress = ((Number(currentPrice) / Number(ATHprice ?? athPriceRes?.ATHPrice)) * 100).toFixed(6);
    

    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        coinAddress: data.token,
        athProgress,
        currentPrice: currentPrice.toString(),
        // @ts-ignore
        athPrice: String(Number(ATHprice ?? athPriceRes?.ATHPrice))
    }

    return message;
   }


    getBondingCurveProgress(tokenInPool: number){
    const progress = (((this.totalPoolTokens - tokenInPool) / this.totalPoolTokens) * 100).toFixed(2);
    return progress;
}
    private getMarketCap(tokenInPool: Number, VETHinPool: Number){
    const priceOfToken = this.getPrice(tokenInPool, VETHinPool);
    if (priceOfToken === 0) {
        return "0";
    }

    const marketCap = priceOfToken * this.totalTokens;
    return marketCap.toFixed(6);
}

  getPrice(tokenInPool: Number, VETHinPool: Number){
    const token = Number(tokenInPool);
    const veth = Number(VETHinPool);

    if (!Number.isFinite(token) || !Number.isFinite(veth) || token <= 0) {
        return 0;
    }

    const price = veth / token;
    return Number.isFinite(price) ? price : 0;
}

    private async getATHfromRedis(coinAddress: `0x${string}`){
        if(!TokenRPC.redisClient)return 0;
    const ath = await (TokenRPC.redisClient as RedisClientType).hGet("ATHPrice", coinAddress);
    return ath;
}
}



