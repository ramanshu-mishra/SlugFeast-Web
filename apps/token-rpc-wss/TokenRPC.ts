import WebSocket from "ws";
import { MessageResponse, polledData, QueueData, rawData } from "./interfaces/messageInterface";
import {RedisClientType} from "redis";
import {prisma} from "@repo/database/client";
import { RedisClient } from "./server";



const EVENT_KEY = process.env.REDIS_EVENT_KEY ?? "events";
const MARKET_CAP_ZSET_PREFIX = process.env.REDIS_MARKET_CAP_ZSET_PREFIX ?? "marketcap";
const REDIS_ATH_KEY = process.env.REDIS_ATH_KEY ?? "ATHKey";

const REDIS_TOKEN_POOL = process.env.REDIS_TOKEN_POOL_KEY ?? "TOKEN_POOL"

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
                        const latest = await TokenRPC.getLatestMarketCapPoint(coinAddress);
                        if (!latest) return;

                        const marketCap = latest.marketCap;
                        const marketCapNumber = Number(marketCap);
                        if (!Number.isFinite(marketCapNumber) || marketCapNumber <= 0) return;

                        const tokenPool = await TokenRPC.getTokenPool(coinAddress);
                        const poolTokens = Number(tokenPool?.poolTokens);
                        const poolVETHs = Number(tokenPool?.poolVETHs);

                        const currentPrice = Number.isFinite(poolTokens)
                            && Number.isFinite(poolVETHs)
                            && poolTokens > 0
                            ? this.getPrice(poolTokens, poolVETHs)
                            : marketCapNumber / this.totalTokens;

                        const bondingCurveProgress = Number.isFinite(poolTokens) && poolTokens > 0
                            ? Number(this.getBondingCurveProgress(poolTokens))
                            : 0;

                        const athFromRedis = await this.getATHfromRedis(coinAddress);
                        const athPriceNumber = Number(athFromRedis);
                        const athPrice = Number.isFinite(athPriceNumber) && athPriceNumber > 0
                            ? athPriceNumber
                            : currentPrice;

                        const athProgress = athPrice > 0
                            ? ((currentPrice / athPrice) * 100).toFixed(6)
                            : "0.000000";

                        const message: MessageResponse = {
                            bondingCurveProgress,
                            marketCap,
                            currentPrice: currentPrice.toString(),
                            athPrice: athPrice.toString(),
                            athProgress,
                            coinAddress,
                        };
                        
                        

                        const eventTimestamp = Math.floor(Date.now() / 1000);
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

   async updateClients(row:any, event: "buy"|"sell"){
        const parsedMessage = await this.parseMessageResponse(row);
        const eventTimestamp = Number(row.blockTimestamp ?? Math.floor(Date.now() / 1000));
       await TokenRPC.pushMarketCap(row.token, parsedMessage.marketCap, eventTimestamp, row.transactionHash);
       await TokenRPC.pushTokenPool(row.token,row.poolTokens,row.poolVETHs);
        const changes = await TokenRPC.getMarketCapChanges(row.token, parsedMessage.marketCap, eventTimestamp);
        Object.assign(parsedMessage, changes);
        
        this.broadCast(row.token, parsedMessage);
        TokenRPC.pushRedisEvent(row.token, this.parseRedisEvent(row , event));
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

    private static async pushMarketCap(
    coinAddress: `0x${string}`,
    marketCap: string,
    timestamp: number,
    txHash?: string
   ) {
    if (!this.redisClient) return;

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress.toLowerCase()}`;
    const value = JSON.stringify({ marketCap, txHash: txHash ?? null });
     await this.redisClient.zAdd(key, [{ score: timestamp, value }]);
   }

   private static async getLatestMarketCapPoint(
    coinAddress: `0x${string}`
   ): Promise<{ marketCap: string; timestamp: number } | null> {
    if (!this.redisClient) return null;

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress.toLowerCase()}`;
    const rows = await this.redisClient.sendCommand(["ZREVRANGE", key, "0", "0", "WITHSCORES"]);
    const member = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    const score = Array.isArray(rows) && rows.length > 1 ? rows[1] : null;
    if (!member || typeof member !== "string" || !score) return null;

    try {
        const parsed = JSON.parse(member) as { marketCap?: string };
        const cap = Number(parsed.marketCap);
        if (!Number.isFinite(cap) || cap <= 0) return null;

        const timestamp = Math.floor(Number(score));
        if (!Number.isFinite(timestamp) || timestamp <= 0) return null;

        return { marketCap: cap.toFixed(6), timestamp };
    } catch {
        return null;
    }
   }

   private static async getMarketCapAtOrBefore(
    key: string,
    timestamp: number
   ): Promise<number | null> {
    if (!this.redisClient) return null;

    const rows = await this.redisClient.sendCommand([
        "ZREVRANGEBYSCORE",
        key,
        timestamp.toString(),
        "-inf",
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
        const boundaryTimestamp = timestamp - window.seconds;
        const baseline = await this.getMarketCapAtOrBefore(key, boundaryTimestamp);
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

        await (TokenRPC.redisClient as RedisClientType).hSet(REDIS_ATH_KEY, data.token, athPriceRes.ATHPrice);
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
    const ath = await (TokenRPC.redisClient as RedisClientType).hGet(REDIS_ATH_KEY, coinAddress);
    return ath;
}

    private static async pushTokenPool(coinAddress: `0x${string}`, poolTokens: string | number | bigint, poolVETHs: string | number | bigint){
        if (!TokenRPC.redisClient) return;
        await (TokenRPC.redisClient as RedisClientType).hSet(REDIS_TOKEN_POOL, coinAddress, JSON.stringify({
            poolTokens: poolTokens,
            poolVETHs: poolVETHs
        }))
    }

    private static async getTokenPool(coinAddress: `0x${string}`): Promise<{ poolTokens: string | number; poolVETHs: string | number } | null> {
        if (!TokenRPC.redisClient) return null;

        const raw = await (TokenRPC.redisClient as RedisClientType).hGet(REDIS_TOKEN_POOL, coinAddress);
        if (!raw) return null;

        try {
            const parsed = JSON.parse(raw) as { poolTokens?: string | number; poolVETHs?: string | number };
            if (parsed.poolTokens == null || parsed.poolVETHs == null) return null;
            return { poolTokens: parsed.poolTokens, poolVETHs: parsed.poolVETHs };
        } catch {
            return null;
        }
    }
}



