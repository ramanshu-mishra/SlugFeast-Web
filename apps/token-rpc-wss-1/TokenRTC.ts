import WebSocket from "ws";
import { MessageResponse, polledData, QueueData, rawData } from "./interfaces/messageInterface";
import {RedisClientType} from "redis";
import {prisma} from "@repo/database/client";
import { RedisClient } from "./server";
import { fetchEthUsdConversion } from "./utilities/priceConversion";



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

export class TokenRTC{
   private subscribers = new Map<`0x${string}`, Set<WebSocket>>();
   private socket_token_map = new Map<WebSocket, Set<string>>();
   private subscribedAll = new Set<WebSocket>;
   private static singleTon:TokenRTC|null = null;
   private static redisClient: RedisClientType|null;
   private static loopStarted = false;
   private static loopInProgress = false;
   private static loopIntervalMs = Number(process.env.LOOP_INTERVAL_MS) || 3000;
   private totalPoolTokens = Number(process.env.POOL_TOKENS_UNLOCKED) || 800*10**6*10**6;
   private totalTokens = Number(process.env.POOL_TOKENS_TOTAL) || 1*10**9*10**6; 
    
  

    static getTokenRPC(redisClient: RedisClientType){
        if(this.singleTon == null){
            this.singleTon = new TokenRTC();
            this.redisClient = redisClient;
            this.singleTon.init_loop();
        }
        return this.singleTon;
   }
   async handleClosedSocket(ws: WebSocket){
    const coins = this.socket_token_map.get(ws);
    if(!coins || coins.size == 0){
      return;
    }
    coins.forEach(coin=>{
      this.unsubscribe(coin as `0x${string}`, ws);
    });
  }

   init_loop(){
        if (TokenRTC.loopStarted) return;
        TokenRTC.loopStarted = true;

        setInterval(async () => {
            if (TokenRTC.loopInProgress) return;
            TokenRTC.loopInProgress = true;

            try {
                const redisClient = TokenRTC.redisClient;
                if (!redisClient) return;

                const coinAddresses = Array.from(this.subscribers.keys());
                if (coinAddresses.length === 0) return;

                await Promise.all(
                    coinAddresses.map(async (coinAddress) => {
                        const latest = await TokenRTC.getLatestMarketCapPoint(coinAddress);
                        if (!latest) return;

                        const marketCap = latest.marketCap;
                        const marketCapNumber = Number(marketCap);
                        if (!Number.isFinite(marketCapNumber) || marketCapNumber <= 0) return;

                        const tokenPool = await TokenRTC.getTokenPool(coinAddress);
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

                        const usd = await fetchEthUsdConversion(marketCapNumber ?? 0);
                        const usd_ath = await fetchEthUsdConversion(Number(athPrice));
                        const usd_curr = await fetchEthUsdConversion(Number(currentPrice));

                        const message: MessageResponse = {
                            bondingCurveProgress,
                            marketCap,
                            marketCap_usd: (usd ? usd.usdValue : 0).toString(),
                            currentPrice: currentPrice.toString(),
                            athPrice: athPrice.toString(),
                            athProgress,
                            coinAddress,
                            currentPrice_usd: (usd_curr ? usd_curr.usdValue : 0).toString(),
                            athPrice_usd : (usd_ath ? usd_ath.usdValue : 0).toString()
                        };
                        
                        

                        const eventTimestamp = Math.floor(Date.now() / 1000);
                        const changes = await TokenRTC.getMarketCapChanges(coinAddress, message.marketCap, eventTimestamp);
                        Object.assign(message, changes);

                        this.broadCast(coinAddress, message);

                        
                        
                    })
                );
            } catch (error) {
                console.error("[TokenRTC] init_loop error", error);
            } finally {
                TokenRTC.loopInProgress = false;
            }
        }, TokenRTC.loopIntervalMs);
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
        let stcoin = this.socket_token_map.get(ws);
        if(!sockets){
            sockets = new Set();
            this.subscribers.set(coinAddress, sockets);
        }
        if(!stcoin){
            stcoin = new Set();
            this.socket_token_map.set(ws, stcoin);
        }
        stcoin.add(coinAddress);
        sockets.add(ws);
   }    

   unsubscribe(coinAddress: `0x${string}`, ws: WebSocket){
        const sockets = this.subscribers.get(coinAddress);
        const stcoin = this.socket_token_map.get(ws);
        if(!sockets || !stcoin)return;

        sockets.delete(ws);
        stcoin.delete(coinAddress);
        if (sockets.size === 0) {
            this.subscribers.delete(coinAddress);
        }
        if(stcoin.size == 0){
            this.socket_token_map.delete(ws);
        }
   }

   subscribeAll(ws: WebSocket){
        this.subscribedAll.add(ws);
   }


   unsubscribeAll(ws:WebSocket){
        this.subscribedAll.delete(ws);
   }

   async updateClients(row:any, event: "buy"|"sell"){
        const parsedMessage = await this.parseMessageResponse(row);
        const eventTimestamp = Number(row.blockTimestamp ?? Math.floor(Date.now() / 1000));
       await TokenRTC.pushMarketCap(row.token, parsedMessage.marketCap, eventTimestamp, row.transactionHash);
       await TokenRTC.pushTokenPool(row.token,row.poolTokens,row.poolVETHs);
        const changes = await TokenRTC.getMarketCapChanges(row.token, parsedMessage.marketCap, eventTimestamp);
        Object.assign(parsedMessage, changes);
        
        this.broadCast(row.token, parsedMessage);
        TokenRTC.pushRedisEvent(row.token, this.parseRedisEvent(row , event));
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
           blockTimeStamp: data.blockTimestamp
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

    // @ts-ignore
    const athProgress = ((Number(currentPrice) / Number(ATHprice)) * 100).toFixed(6);
    const usd = await fetchEthUsdConversion(Number(mc));
    const usd_ath = await fetchEthUsdConversion(Number(ATHprice));
    const usd_curr = await fetchEthUsdConversion(Number(currentPrice));

    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        marketCap_usd: (usd ? usd.usdValue : 0).toString(),
        coinAddress: data.token,
        athProgress,
        currentPrice: currentPrice.toString(),

        // @ts-ignore
        athPrice: String(Number(ATHprice)),
        currentPrice_usd: (usd_curr ? usd_curr.usdValue : 0).toString(),
        athPrice_usd : (usd_ath ? usd_ath.usdValue : 0).toString()
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

    const price = (veth / token)/10**12;
    return Number.isFinite(price) ? price : 0;
}

    private async getATHfromRedis(coinAddress: `0x${string}`){
        if(!TokenRTC.redisClient) {
            const res = await this.getATHfromDB(coinAddress);
            return res;
        }
    const ath = await (TokenRTC.redisClient as RedisClientType).hGet(REDIS_ATH_KEY, coinAddress);
    if(!ath){
        const res = await this.getATHfromDB(coinAddress);
        return res;
    }
}

    private async getATHfromDB(coinAddress: `0x${string}`){
        const res = await prisma.coin.findFirst({
            where: {
                address: coinAddress
            },
            select:{
                // @ts-ignore
                ATHPrice: true
            }
        });


        // @ts-ignore
        console.log("ath price for ", coinAddress, " is ", res?.ATHPrice);
        // @ts-ignore
        await (TokenRTC.redisClient as RedisClientType).hSet(REDIS_ATH_KEY, coinAddress, res?.ATHPrice);
        // @ts-ignore
        return res.ATHPrice;
    }

    private static async pushTokenPool(coinAddress: `0x${string}`, poolTokens: string | number | bigint, poolVETHs: string | number | bigint){
        if (!TokenRTC.redisClient) return;
        await (TokenRTC.redisClient as RedisClientType).hSet(REDIS_TOKEN_POOL, coinAddress, JSON.stringify({
            poolTokens: poolTokens,
            poolVETHs: poolVETHs
        }))
    }

    private static async getTokenPool(coinAddress: `0x${string}`): Promise<{ poolTokens: string | number; poolVETHs: string | number } | null> {
        if (!TokenRTC.redisClient) return null;

        const raw = await (TokenRTC.redisClient as RedisClientType).hGet(REDIS_TOKEN_POOL, coinAddress);
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



