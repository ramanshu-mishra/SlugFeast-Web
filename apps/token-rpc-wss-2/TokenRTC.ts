import WebSocket from "ws";
import {
  MessageResponse_TokenData,
  polledData,
  QueueData,
  rawData,
  TradeEvent,
  TradePoint,
} from "@repo/messaging/interfaces";
import { RedisClientType, createClient } from "redis";
import { CHANGE_WINDOWS } from "./interfaces";
import type { ChangeKey } from "./interfaces";
import { prisma } from "@repo/database/client";
import { getTradeEvent } from "./utility/tradeEvent";
import {fetchEthUsdConversion} from "./utility/Priceconversion";

const EVENT_KEY = process.env.REDIS_EVENT_KEY ?? "events";
const MARKET_CAP_ZSET_PREFIX =
  process.env.REDIS_MARKET_CAP_ZSET_PREFIX ?? "marketcap";
const REDIS_ATH_KEY = process.env.REDIS_ATH_KEY ?? "ATHKey";
const REDIS_TOKEN_POOL = process.env.REDIS_TOKEN_POOL_KEY ?? "TOKEN_POOL";

export class TokenRTC {
  private static _singleton: TokenRTC | null = null;
  private static loopStarted = false;
  private static loopInProgress = false;
  private static loopIntervalMs = Number(process.env.LOOP_INTERVAL_MS) || 3000;
  private subscribers: Map<string, Set<WebSocket>> = new Map();
  private socket_token_map: Map<WebSocket, Set<string> > = new Map();
  private redisClient: RedisClientType | null = null;
  private totalPoolTokens = 800 * 10 ** 6 * 10 ** 6;
  private totalTokens = 1_000_000_000;

  static async getTokenRTC() {
    if (!this._singleton) {
      this._singleton = new TokenRTC();
      await this._singleton.startRedisClient();
      this._singleton.init_loop();
    }
    
    return this._singleton;
  }

  async startRedisClient() {
    const url = process.env.REDIS_SERVER_URL;
    if (!url) throw new Error("Redis Server URL not found");
    const _redisClient = createClient({
      url: url,
    });
    await _redisClient.connect();
    this.redisClient = _redisClient as RedisClientType;
  }

  subscribe(coinAddress: `0x${string}`, ws: WebSocket) {
    let st = this.subscribers.get(coinAddress);
    let stcoin = this.socket_token_map.get(ws);
    if (!st) {
      st = new Set();
      this.subscribers.set(coinAddress, st);
    }
    if(!stcoin){
      stcoin = new Set();
      this.socket_token_map.set(ws, stcoin);
    }
    st.add(ws);
    stcoin.add(coinAddress);
    
    console.log("[TokenRTC] subscribed", coinAddress, "count:", st.size);
  }

  unsubscribe(coinAddress: `0x${string}`, ws: WebSocket) {
    const st = this.subscribers.get(coinAddress);
    const stcoin = this.socket_token_map.get(ws);
    if (!st || !stcoin) return;
    st.delete(ws);
    stcoin.delete(coinAddress);
    if (st.size === 0) {
      this.subscribers.delete(coinAddress);
    }
    if(stcoin.size === 0){
      this.socket_token_map.delete(ws);
    }

    console.log("[TokenRTC] unsubscribed", coinAddress, "remaining:", st.size);
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

  async updateClientCoinData(row: polledData, event: "buy" | "sell") {
    const parsedMessage = await this.parseMessageResponse(row);
    const eventTimestamp = Number(
      row.blockTimestamp ?? Math.floor(Date.now() / 1000),
    );
    await this.pushMarketCap(
      row.token,
      parsedMessage.marketCap,
      eventTimestamp,
    );

    await this.pushTokenPool(
      row.token,
      row.poolTokens.toString(),
      row.poolVETHs.toString(),
    );
    const changes = await this.getMarketCapChanges(
      row.token,
      parsedMessage.marketCap,
      eventTimestamp,
    );
    Object.assign(parsedMessage, changes);

    this.broadCast(row.token, parsedMessage);
    this.pushRedisEvent(row.token, this.parseRedisEvent(row, event));
  }

  async updateClientTrades(row: polledData, event: "buy" | "sell") {
    const coinAddress = row.token;
    const tradeEvent = await getTradeEvent(row);
    if (!tradeEvent) return;
    this.broadCast(coinAddress, {
      event: "TradeEvent",
      coinAddress: row.token as `0x${string}`,
      data: tradeEvent as TradePoint,
    } as TradeEvent);
  }

  private pushRedisEvent(coinAddress: `0x${string}`, event: QueueData) {
    if (!this.redisClient) return;
    this.redisClient.hSet(EVENT_KEY, coinAddress, JSON.stringify(event));
    console.log("pushed to redis ", coinAddress, event);
  }

  private parseRedisEvent(data: polledData, event: "buy" | "sell"): QueueData {
    const parsedEvent: QueueData = {
      event,
      coinAddress: data.token,
      poolTokens: Number(data.poolTokens) as any,
      poolVETHs: Number(data.poolVETHs) as any,
      blockTimeStamp: data.blockTimestamp,
    };
    return parsedEvent;
  }

  private async pushTokenPool(
    coinAddress: `0x${string}`,
    poolTokens: string | number | bigint,
    poolVETHs: string | number | bigint,
  ) {
    if (!this.redisClient) return;
    await (this.redisClient as RedisClientType).hSet(
      REDIS_TOKEN_POOL,
      coinAddress,
      JSON.stringify({
        poolTokens: poolTokens,
        poolVETHs: poolVETHs,
      }),
    );
  }

  async getMarketCapChanges(
    coinAddress: `0x${string}`,
    currentMarketCap: string,
    timestamp: number,
  ): Promise<Partial<MessageResponse_TokenData>> {
    const changes: Partial<MessageResponse_TokenData> = {
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

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress}`;

    if ((await this.redisClient.zCard(key)) === 0) {
      await this.fetchMarketCapfromDB(coinAddress);
    }

    for (const window of CHANGE_WINDOWS) {
      const boundaryTimestamp = timestamp - window.seconds;
      const baseline = await this.getMarketCapAtOrBefore(
        key,
        boundaryTimestamp,
      );
      if (!baseline) continue;

      const pct = ((current - baseline) / baseline) * 100;
      if (!Number.isFinite(pct)) continue;

      changes[window.key] = Number(pct.toFixed(4));
    }

    return changes;
  }

  private async getMarketCapAtOrBefore(
    key: string,
    timestamp: number,
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

  async fetchMarketCapfromDB(coinAddress: `0x${string}`) {
    const redisClient = this.redisClient;
    if (!redisClient) return null;

    const pool = (await prisma.coin.findUnique({
      where: {
        address: coinAddress,
      },
      select: {
        TokenAmount: true,
        VETHAmount: true,
        ATHPrice: true,
        lastTimeStamp: true,
      } as any,
    })) as any;

    if (!pool) return null;

    const marketCap = this.getMarketCap(
      Number(pool.TokenAmount),
      Number(pool.VETHAmount),
    );
    const marketCapNumber = Number(marketCap);
    if (!Number.isFinite(marketCapNumber) || marketCapNumber <= 0) return null;

    const parsedTimestamp = Number(pool.lastTimeStamp);
    const timestamp =
      Number.isFinite(parsedTimestamp) && parsedTimestamp > 0
        ? Math.floor(parsedTimestamp)
        : Math.floor(Date.now() / 1000);

    if (!this.redisClient) {
    }

    await this.pushMarketCap(coinAddress, marketCap, timestamp);

    const athPriceValue = String(pool.ATHPrice ?? "0");
    const athPriceNumber = Number(athPriceValue);
    if (Number.isFinite(athPriceNumber) && athPriceNumber > 0) {
      await redisClient.hSet(REDIS_ATH_KEY, coinAddress, athPriceValue);
    }

    return { marketCap, timestamp };
  }

  getBondingCurveProgress(tokenInPool: number) {
    const progress = (
      ((this.totalPoolTokens - tokenInPool) / this.totalPoolTokens) *
      100
    ).toFixed(2);
    return progress;
  }
  private getMarketCap(tokenInPool: Number, VETHinPool: Number) {
    const priceOfToken = this.getPrice(tokenInPool, VETHinPool);
    if (priceOfToken === 0) {
      return "0";
    }

    const marketCap = priceOfToken * this.totalTokens;
    return marketCap.toFixed(6);
  }

  getPrice(tokenInPool: Number, VETHinPool: Number) {
    const token = Number(tokenInPool);
    const veth = Number(VETHinPool);

    if (!Number.isFinite(token) || !Number.isFinite(veth) || token <= 0) {
      return 0;
    }

    const price = (veth / token)/10**12;
    return Number.isFinite(price) ? price : 0;
  }

  private async getLatestMarketCapPoint(
    coinAddress: `0x${string}`,
  ): Promise<{ marketCap: string; timestamp: number } | null> {
    if (!this.redisClient) return null;

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress.toLowerCase()}`;
    const rows = await this.redisClient.sendCommand([
      "ZREVRANGE",
      key,
      "0",
      "0",
      "WITHSCORES",
    ]);

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

  private async getTokenPool(coinAddress: `0x${string}`) {
    if (!this.redisClient) return null;

    const rawPool = await this.redisClient.hGet(
      REDIS_TOKEN_POOL,
      coinAddress,
    );
    if (!rawPool) return null;

    try {
      const parsed = JSON.parse(rawPool) as {
        poolTokens?: string | number | bigint;
        poolVETHs?: string | number | bigint;
      };

      const poolTokens = Number(parsed.poolTokens);
      const poolVETHs = Number(parsed.poolVETHs);

      if (
        !Number.isFinite(poolTokens) ||
        !Number.isFinite(poolVETHs) ||
        poolTokens <= 0 ||
        poolVETHs < 0
      ) {
        return null;
      }

      return { poolTokens, poolVETHs };
    } catch {
      return null;
    }
  }

  private async getATHfromRedis(coinAddress: `0x${string}`) {
    if (!this.redisClient) {
      return this.getATHfromDB(coinAddress);
    }

    const ath = await this.redisClient.hGet(REDIS_ATH_KEY, coinAddress);
    if (ath) {
      return ath;
    }

    return this.getATHfromDB(coinAddress);
  }

  private async getATHfromDB(coinAddress: `0x${string}`) {
    const redisClient = this.redisClient;
    const res = await prisma.coin.findFirst({
      where: {
        address: coinAddress,
      },
      select: {
        // @ts-ignore
        ATHPrice: true,
      },
    });

    const athPrice = String((res as any)?.ATHPrice ?? "0");
    console.log("ath price for ", coinAddress, " is ", athPrice);

    if (redisClient) {
      await redisClient.hSet(REDIS_ATH_KEY, coinAddress, athPrice);
    }

    return athPrice;
  }

  private async pushMarketCap(
    coinAddress: `0x${string}`,
    marketCap: string,
    timestamp: number,
    txHash?: string,
  ) {
    if (!this.redisClient) return;

    const key = `${MARKET_CAP_ZSET_PREFIX}:${coinAddress}`;
    const value = JSON.stringify({ marketCap, txHash: txHash ?? null });
    await this.redisClient.zAdd(key, [{ score: timestamp, value }]);
  }

  private async parseMessageResponse(data: rawData) {
    const mc = this.getMarketCap(
      Number(data.poolTokens),
      Number(data.poolVETHs),
    );
    const bcprogress = this.getBondingCurveProgress(Number(data.poolTokens));
    const currentPrice = this.getPrice(
      Number(data.poolTokens),
      Number(data.poolVETHs),
    );

    let ATHprice = await this.getATHfromRedis(data.token);

    // @ts-ignore
    const athProgress = (
      (Number(currentPrice) / Number(ATHprice)) *
      100
    ).toFixed(6);

    const usd = await fetchEthUsdConversion(Number(mc));
    const usd_ath = await fetchEthUsdConversion(Number(ATHprice));
    const usd_curr = await fetchEthUsdConversion(Number(currentPrice));

    const message: MessageResponse_TokenData = {
      bondingCurveProgress: Number(bcprogress),
      marketCap: mc,
      marketCap_usd : (usd ? usd.usdValue : 0).toString(),
      coinAddress: data.token,
      athProgress,
      currentPrice: currentPrice.toString(),
      // @ts-ignore
      athPrice: String(Number(ATHprice)),
      athPrice_usd : (usd_ath ? usd_ath.usdValue : 0).toString(),
      currentPrice_usd : (usd_curr ? usd_curr.usdValue : 0).toString()
      

    };

    return message;
  }

  broadCast(
    coinAddress: `0x${string}`,
    message: MessageResponse_TokenData | TradeEvent,
  ) {
    this.subscribers.get(coinAddress)?.forEach((ws) => {
      if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
    console.log("broadcasted ", message);
  }

  private init_loop() {
    if (TokenRTC.loopStarted) return;
    TokenRTC.loopStarted = true;

    setInterval(async () => {
      if (TokenRTC.loopInProgress) return;
      TokenRTC.loopInProgress = true;

      try {
        if (!this.redisClient) return;

        const coinAddresses = Array.from(this.subscribers.keys()) as `0x${string}`[];
        if (coinAddresses.length === 0) return;

        await Promise.all(
          coinAddresses.map(async (coinAddress) => {
            const latest = await this.getLatestMarketCapPoint(coinAddress);
            if (!latest) return;

            const tokenPool = await this.getTokenPool(coinAddress);
            const poolTokens = Number(tokenPool?.poolTokens);
            const poolVETHs = Number(tokenPool?.poolVETHs);

            const marketCapNumber = Number(latest.marketCap);
            if (!Number.isFinite(marketCapNumber) || marketCapNumber <= 0) {
              return;
            }

            const currentPrice =
              Number.isFinite(poolTokens) &&
              Number.isFinite(poolVETHs) &&
              poolTokens > 0
                ? this.getPrice(poolTokens, poolVETHs)
                : marketCapNumber / this.totalTokens;

            const bondingCurveProgress =
              Number.isFinite(poolTokens) && poolTokens > 0
                ? Number(this.getBondingCurveProgress(poolTokens))
                : 0;

            const athFromRedis = await this.getATHfromRedis(coinAddress);
            const athPriceNumber = Number(athFromRedis);
            const athPrice =
              Number.isFinite(athPriceNumber) && athPriceNumber > 0
                ? athPriceNumber
                : currentPrice;

            const athProgress =
              athPrice > 0
                ? ((currentPrice / athPrice) * 100).toFixed(6)
                : "0.000000";


            const usd = await fetchEthUsdConversion(marketCapNumber ?? 0);
            const usd_ath = await fetchEthUsdConversion(Number(athPrice));
            const usd_curr = await fetchEthUsdConversion(Number(currentPrice));

            const message: MessageResponse_TokenData = {
              bondingCurveProgress,
              marketCap: latest.marketCap,
              marketCap_usd : (usd ? usd.usdValue : 0).toString(),
              currentPrice: currentPrice.toString(),
              athPrice: athPrice.toString(),
              athProgress,
              coinAddress,
              currentPrice_usd: (usd_curr ? usd_curr.usdValue : 0).toString(),
              athPrice_usd : (usd_ath ? usd_ath.usdValue : 0).toString()
            };

            const changes = await this.getMarketCapChanges(
              coinAddress,
              message.marketCap,
              latest.timestamp,
            );
            Object.assign(message, changes);

            this.broadCast(coinAddress, message);
          }),
        );
      } catch (error) {
        console.error("[TokenRTC] init_loop error", error);
      } finally {
        TokenRTC.loopInProgress = false;
      }
    }, TokenRTC.loopIntervalMs);
  }
}
