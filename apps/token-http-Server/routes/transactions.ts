import { Request, Response } from "express";
import { router } from "./SingleRouter";
import Big from "big.js";

const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_API_KEY = process.env.SUBGRAPH_API_KEY;

const PAGE_SIZE = 1000;
const MAX_PAGES = 50;
const TOTAL_SUPPLY = 1_000_000_000;
const BINANCE_ETHUSDT_TICKER_URL = "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT";

interface PeriodInterface {
    start: string;
    end: string;
}

interface Transaction {
    token: string;
    VETH: string;
    amount: string;
    blockTimestamp: string;
}

interface OHLCCandle {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface GraphQLResponse<T> {
    data?: T;
    errors?: { message: string }[];
}

interface TransactionPageResponse {
    tokenBoughts?: Transaction[];
    tokenSolds?: Transaction[];
}

interface TransactionQueryVariables {
    token: string;
    start: string;
    end: string;
    first: number;
    skip: number;
}

type QuoteCurrency = "eth" | "usdt";

interface BinanceTickerPriceResponse {
    symbol: string;
    price: string;
}

function fillMissingIntervalsWithLastClose(candles: OHLCCandle[], intervalSeconds: number): OHLCCandle[] {
    if (candles.length === 0) {
        return candles;
    }

    const sorted = [...candles].sort((a, b) => a.timestamp - b.timestamp);
    
    if (sorted.length === 1) {
        return sorted;
    }

    const filled: OHLCCandle[] = [sorted[0]!];

    for (let i = 1; i < sorted.length; i += 1) {
        const current = sorted[i]!;
        let previous = filled[filled.length - 1]!;
        let nextTimestamp = previous.timestamp + intervalSeconds;

        while (nextTimestamp < current.timestamp) {
            const carryClose = previous.close;
            const synthetic: OHLCCandle = {
                timestamp: nextTimestamp,
                open: carryClose,
                high: carryClose,
                low: carryClose,
                close: carryClose,
                volume: 0,
            };

            filled.push(synthetic);
            previous = synthetic;
            nextTimestamp += intervalSeconds;
        }

        filled.push(current);
    }

    return filled;
}

function toMarketCapCandles(candles: OHLCCandle[], multiplier: number): OHLCCandle[] {
    return candles.map((candle) => ({
        ...candle,
        open: candle.open * multiplier,
        high: candle.high * multiplier,
        low: candle.low * multiplier,
        close: candle.close * multiplier,
    }));
}

async function getEthUsdtPrice(): Promise<number> {
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

    return parsed;
}

const FETCH_TRANSACTIONS_QUERY = `
query FetchTransactions($token: String!, $start: BigInt!, $end: BigInt!, $first: Int!, $skip: Int!) {
  tokenBoughts(
    where: {
      token: $token
      blockTimestamp_gte: $start
      blockTimestamp_lte: $end
    }
    orderBy: blockTimestamp
    orderDirection: asc
    first: $first
    skip: $skip
  ) {
    token
    VETH
    amount
    blockTimestamp
  }
  tokenSolds(
    where: {
      token: $token
      blockTimestamp_gte: $start
      blockTimestamp_lte: $end
    }
    orderBy: blockTimestamp
    orderDirection: asc
    first: $first
    skip: $skip
  ) {
    token
    VETH
    amount
    blockTimestamp
  }
}`;

function isValidHexAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

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

// GraphQL fetcher
async function gql<T, TVariables>(
    query: string,
    variables: TVariables
): Promise<T> {
    if (!SUBGRAPH_URL) {
        throw new Error("SUBGRAPH_URL is not configured");
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (SUBGRAPH_API_KEY) {
        headers.Authorization = `Bearer ${SUBGRAPH_API_KEY}`;
    }

    const res = await fetch(SUBGRAPH_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) throw new Error(`Subgraph HTTP ${res.status}`);

    const json = await res.json() as GraphQLResponse<T>;
    if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join(", "));

    if (!json.data) {
        throw new Error("Subgraph returned no data");
    }

    return json.data;
}

// Fetch transactions from subgraph
async function fetchTransactions(
    token: string,
    startTimestamp: string,
    endTimestamp: string
): Promise<Transaction[]> {
    const allTransactions: Transaction[] = [];

    for (let page = 0; page < MAX_PAGES; page += 1) {
        const skip = page * PAGE_SIZE;
        const variables: TransactionQueryVariables = {
            token: token.toLowerCase(),
            start: startTimestamp,
            end: endTimestamp,
            first: PAGE_SIZE,
            skip,
        };

        const data = await gql<TransactionPageResponse, TransactionQueryVariables>(
            FETCH_TRANSACTIONS_QUERY,
            variables
        );

        const boughtBatch = data.tokenBoughts ?? [];
        const soldBatch = data.tokenSolds ?? [];

        allTransactions.push(...boughtBatch, ...soldBatch);

        if (boughtBatch.length ==0 && soldBatch.length == 0) {
            break;
        }

        if (page === MAX_PAGES - 1) {
            throw new Error("Transaction range too large. Please reduce selected period.");
        }
    }
    
    // Sort by timestamp
    return allTransactions.sort(
        (a, b) => Number(a.blockTimestamp) - Number(b.blockTimestamp)
    );
}

// Convert transactions to price values (VETH per token)
function getPrice(transaction: Transaction): number | null {
    const veth = new Big(transaction.VETH);
    const amount = new Big(transaction.amount);

    if (amount.lte(0) || veth.lt(0)) {
        return null;
    }

    try {
        return veth.div(amount).toNumber();
    } catch {
        return null;
    }
}

// Create 15-minute candles for 1h view
function get1hView(transactions: Transaction[]): OHLCCandle[] {
    const candles: Map<number, OHLCCandle> = new Map();
    const INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds

    for (const tx of transactions) {
        const timestamp = Number(tx.blockTimestamp) * 1000; // Convert to milliseconds
        const candleTime = Math.floor(timestamp / INTERVAL) * INTERVAL;
        const price = getPrice(tx);
        const volume = Number(tx.amount);

        if (price === null || !Number.isFinite(volume) || volume <= 0) {
            continue;
        }

        if (!candles.has(candleTime)) {
            candles.set(candleTime, {
                timestamp: candleTime / 1000,
                open: price,
                high: price,
                low: price,
                close: price,
                volume,
            });
        } else {
            const candle = candles.get(candleTime)!;
            candle.high = Math.max(candle.high, price);
            candle.low = Math.min(candle.low, price);
            candle.close = price;
            candle.volume += volume;
        }
    }

    const baseCandles = Array.from(candles.values()).sort((a, b) => a.timestamp - b.timestamp);
    return fillMissingIntervalsWithLastClose(baseCandles, INTERVAL / 1000);
}

// Create daily candles for 1 month view
function getDailyView(transactions: Transaction[]): OHLCCandle[] {
    const candles: Map<number, OHLCCandle> = new Map();
    const INTERVAL = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    for (const tx of transactions) {
        const timestamp = Number(tx.blockTimestamp) * 1000; // Convert to milliseconds
        const candleTime = Math.floor(timestamp / INTERVAL) * INTERVAL;
        const price = getPrice(tx);
        const volume = Number(tx.amount);

        if (price === null || !Number.isFinite(volume) || volume <= 0) {
            continue;
        }

        if (!candles.has(candleTime)) {
            candles.set(candleTime, {
                timestamp: candleTime / 1000,
                open: price,
                high: price,
                low: price,
                close: price,
                volume,
            });
        } else {
            const candle = candles.get(candleTime)!;
            candle.high = Math.max(candle.high, price);
            candle.low = Math.min(candle.low, price);
            candle.close = price;
            candle.volume += volume;
        }
    }

    const baseCandles = Array.from(candles.values()).sort((a, b) => a.timestamp - b.timestamp);
    return fillMissingIntervalsWithLastClose(baseCandles, INTERVAL / 1000);
}

// Main endpoint handler
router.get("/transactions/:token/:timeframe", async (req: Request, res: Response) => {
    try {
        const token = Array.isArray(req.params.token)
            ? req.params.token[0]
            : req.params.token;
        const timeframe = Array.isArray(req.params.timeframe)
            ? req.params.timeframe[0]
            : req.params.timeframe;
        const periodHeader = Array.isArray(req.headers.period)
            ? req.headers.period[0]
            : req.headers.period;
        const quoteCurrencyInput = Array.isArray(req.query.quote)
            ? req.query.quote[0]
            : req.query.quote;
        const quoteCurrency = (typeof quoteCurrencyInput === "string"
            ? quoteCurrencyInput.toLowerCase()
            : "eth") as QuoteCurrency;

        
        if(!token || !timeframe){
            return res.status(400).json({
                success: false,
                error: "Invalid Payload"
            });
        }

        if (!isValidHexAddress(token)) {
            return res.status(400).json({
                success: false,
                error: "Invalid token address format",
            });
        }

        if (!periodHeader) {
             res.status(400).json({success: false,  error: "Period header is required" });
             return;
        }

        if (!["eth", "usdt"].includes(quoteCurrency)) {
            return res.status(400).json({ success: false, error: "quote must be 'eth' or 'usdt'" });
        }

        let period: PeriodInterface;
        try {
            period = JSON.parse(periodHeader);
        } catch (e) {
            return res.status(400).json({ success: false, error: "Invalid period format" });
        }

        if (!period.start || !period.end) {
            return res.status(400).json({ success: false, error: "Start and end timestamps are required" });
        }

        const startTimestamp = parseUnixTimestamp(period.start);
        const endTimestamp = parseUnixTimestamp(period.end);

        if (startTimestamp === null || endTimestamp === null) {
            return res.status(400).json({ success: false, error: "Start and end must be valid unix timestamps" });
        }

        if (startTimestamp > endTimestamp) {
            return res.status(400).json({ success: false, error: "Start timestamp must be less than or equal to end timestamp" });
        }

        if (!["1h", "1d"].includes(timeframe as string)) {
            return res.status(400).json({ success: false, error: "Timeframe must be '1h' or '1d'" });
        }

        // Fetch transactions from subgraph
        const transactions = await fetchTransactions(token as `0x${string}`, period.start, period.end);

        if (transactions.length === 0) {
             res.status(200).json({
                success: true,
                token,
                timeframe,
                quote: quoteCurrency,
                metric: "market_cap",
                period,
                candles: [],
                count: 0,
            });
            return;
        }

        // Aggregate based on timeframe
        const candles = timeframe === "1h"
            ? get1hView(transactions) 
            : getDailyView(transactions);

        const quoteMultiplier = quoteCurrency === "usdt" ? await getEthUsdtPrice() : 1;
        const marketCapCandles = toMarketCapCandles(candles, TOTAL_SUPPLY * quoteMultiplier);

        res.status(200).json({
            success: true,
            token,
            timeframe,
            quote: quoteCurrency,
            metric: "market_cap",
            period,
            candles: marketCapCandles,
            count: marketCapCandles.length,
        });
        return;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
})


