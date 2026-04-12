import { polledData } from "@repo/messaging/interfaces";
import Big from "big.js";

const BINANCE_ETHUSDT_TICKER_URL =
    process.env.BINANCE_ETHUSDT_TICKER_URL ??
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";
const TOTAL_SUPPLY = 1_000_000_000;
const TOKEN_DECIMALS = 10 ** 6;
const PRICE_CACHE_TTL_MS = 30_000;
const PRICE_SCALE_DIVISOR = new Big(10).pow(12);
const TOKEN_DECIMALS_BIG = new Big(TOKEN_DECIMALS);
const TOTAL_SUPPLY_BIG = new Big(TOTAL_SUPPLY);

export interface TradePoint {
    timestamp: number;
    marketCapEth: number;
    marketCapUsdt: number;
    volume: number;
    amountInToken: number;
    amountInEth:number,
    txnHash: string,
    blockTimestamp: string
}   

interface BinanceTickerPriceResponse {
    symbol: string;
    price: string;
}
let cachedEthUsdtPrice: { value: number; fetchedAt: number } = {
    value: 0,
    fetchedAt: 0,
};

function parseUnixTimestamp(value: string): number | null {
    if (!/^\d+$/.test(value)) {
        return null;
    }

    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed) || parsed < 0) {
        return null;
    }

    return parsed;
}

function getPrice(row: polledData): number | null {
    const amountRaw = row.amount.toString();
    const vethRaw = row.VETH.toString();

    const amount = new Big(amountRaw);
    const veth = new Big(vethRaw);

    if (amount.lte(0) || veth.lt(0)) {
        return null;
    }

    const priceInEth = veth.div(amount).mul(10**6).toNumber();
    if (!Number.isFinite(priceInEth) || priceInEth <= 0) {
        return null;
    }

    return priceInEth;
}

function getMarketCap(price: number): number {
    const marketCap = new Big(price).times(TOTAL_SUPPLY_BIG).toNumber();
    return Number.isFinite(marketCap) && marketCap > 0 ? marketCap : 0;
}

async function getEthUsdtPrice(): Promise<number> {
    const now = Date.now();
    if (cachedEthUsdtPrice.value > 0 && now - cachedEthUsdtPrice.fetchedAt < PRICE_CACHE_TTL_MS) {
        return cachedEthUsdtPrice.value;
    }

    const res = await fetch(BINANCE_ETHUSDT_TICKER_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Binance HTTP ${res.status}`);
    }

    const payload = await res.json() as BinanceTickerPriceResponse;
    const parsed = Number(payload.price);

    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error("Invalid ETHUSDT price from Binance");
    }

    cachedEthUsdtPrice.value = parsed;
    cachedEthUsdtPrice.fetchedAt = Date.now();
    return parsed;
}

export async function toTradePoint(
    row: polledData,
): Promise<TradePoint | null> {
    const timestamp = parseUnixTimestamp(row.blockTimestamp);
    if (timestamp === null) {
        return null;
    }

    const amountRawBig = new Big(row.amount.toString());
    if (amountRawBig.lte(0)) {
        return null;
    }

    const tokenAmount = amountRawBig.div(TOKEN_DECIMALS_BIG).toNumber();
    if (!Number.isFinite(tokenAmount) || tokenAmount <= 0) {
        return null;
    }

    const tradePrice = getPrice(row); //weith
    if (tradePrice === null) {
        return null;
    }

    const ethUsdtPrice = await getEthUsdtPrice();
    const tradePriceUsdt = new Big(tradePrice).div(10**18).times(ethUsdtPrice).toNumber();
    if (!Number.isFinite(tradePriceUsdt) || tradePriceUsdt <= 0) {
        return null;
    }

    const marketCapEth = getMarketCap(tradePrice/10**18);
    const marketCapUsdt = getMarketCap(tradePriceUsdt);
    const timesStamp = row.blockTimestamp ?? Date.now()/1000;
    const txnHash = row.txHash;
    
    if (marketCapEth <= 0 || marketCapUsdt <= 0) {
        return null;
    }

    return {
        timestamp,
        marketCapEth,
        marketCapUsdt,
        volume: amountRawBig.toNumber(),
        amountInEth: tradePrice,
        amountInToken : tradePriceUsdt,
        txnHash: txnHash.toString(),
        blockTimestamp: timesStamp
    };
}

export async function getTradeEvent(
    row: polledData,
    _intervalSeconds = 1,
): Promise<TradePoint | null> {
    return toTradePoint(row);
}


