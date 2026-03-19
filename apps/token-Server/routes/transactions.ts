import { Request, Response } from "express";
import { router } from "./SingleRouter";

const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_HEADER = `Bearer ${process.env.SUBGRAPH_API_KEY}`;

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

// GraphQL fetcher
async function gql<T>(query: string): Promise<T> {
    const res = await fetch(SUBGRAPH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: SUBGRAPH_HEADER,
        },
        body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`Subgraph HTTP ${res.status}`);
    const json = await res.json() as { data: T; errors?: { message: string }[] };
    if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join(", "));
    return json.data;
}

// Fetch transactions from subgraph
async function fetchTransactions(
    token: string,
    startTimestamp: string,
    endTimestamp: string
): Promise<Transaction[]> {
    const query = `{
        tokenBoughts(
            where: { 
                token: "${token.toLowerCase()}"
                blockTimestamp_gte: "${startTimestamp}"
                blockTimestamp_lte: "${endTimestamp}"
            }
            orderBy: blockTimestamp
            orderDirection: asc
            first: 1000
        ) {
            token
            VETH
            amount
            blockTimestamp
        }
        tokenSolds(
            where: { 
                token: "${token.toLowerCase()}"
                blockTimestamp_gte: "${startTimestamp}"
                blockTimestamp_lte: "${endTimestamp}"
            }
            orderBy: blockTimestamp
            orderDirection: asc
            first: 1000
        ) {
            token
            VETH
            amount
            blockTimestamp
        }
    }`;

    interface TransactionResponse {
        tokenBoughts: Transaction[];
        tokenSolds: Transaction[];
    }

    const data = await gql<TransactionResponse>(query);
    const allTransactions = [...(data.tokenBoughts || []), ...(data.tokenSolds || [])];
    
    // Sort by timestamp
    return allTransactions.sort(
        (a, b) => Number(a.blockTimestamp) - Number(b.blockTimestamp)
    );
}

// Convert transactions to price values (VETH per token)
function getPrice(transaction: Transaction): number {
    const veth = Number(transaction.VETH);
    const amount = Number(transaction.amount);
    if (amount === 0) return 0;
    return veth / amount;
}

// Create 15-minute candles for 1h view
function get1hView(transactions: Transaction[]): OHLCCandle[] {
    const candles: Map<number, OHLCCandle> = new Map();
    const INTERVAL = 15 * 60 * 1000; // 15 minutes in milliseconds

    for (const tx of transactions) {
        const timestamp = Number(tx.blockTimestamp) * 1000; // Convert to milliseconds
        const candleTime = Math.floor(timestamp / INTERVAL) * INTERVAL;
        const price = getPrice(tx);

        if (!candles.has(candleTime)) {
            candles.set(candleTime, {
                timestamp: candleTime / 1000,
                open: price,
                high: price,
                low: price,
                close: price,
                volume: Number(tx.amount),
            });
        } else {
            const candle = candles.get(candleTime)!;
            candle.high = Math.max(candle.high, price);
            candle.low = Math.min(candle.low, price);
            candle.close = price;
            candle.volume += Number(tx.amount);
        }
    }

    return Array.from(candles.values()).sort((a, b) => a.timestamp - b.timestamp);
}

// Create daily candles for 1 month view
function getMonthlyView(transactions: Transaction[]): OHLCCandle[] {
    const candles: Map<number, OHLCCandle> = new Map();
    const INTERVAL = 24 * 60 * 60 * 1000; // 1 day in milliseconds

    for (const tx of transactions) {
        const timestamp = Number(tx.blockTimestamp) * 1000; // Convert to milliseconds
        const candleTime = Math.floor(timestamp / INTERVAL) * INTERVAL;
        const price = getPrice(tx);

        if (!candles.has(candleTime)) {
            candles.set(candleTime, {
                timestamp: candleTime / 1000,
                open: price,
                high: price,
                low: price,
                close: price,
                volume: Number(tx.amount),
            });
        } else {
            const candle = candles.get(candleTime)!;
            candle.high = Math.max(candle.high, price);
            candle.low = Math.min(candle.low, price);
            candle.close = price;
            candle.volume += Number(tx.amount);
        }
    }

    return Array.from(candles.values()).sort((a, b) => a.timestamp - b.timestamp);
}

// Main endpoint handler
router.get("/transactions/:token/:timeframe", async (req: Request, res: Response) => {
    try {
        const { token, timeframe } = req.params;
        const periodHeader = req.headers.period as string;

        
        if(!token || !timeframe){
            res.status(400).json({
                success: false,
                error: "Invalid Payload"
            })
        }
        if (!periodHeader) {
             res.status(400).json({success: false,  error: "Period header is required" });
             return;
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

        if (!["1h", "1month"].includes(timeframe as string)) {
            return res.status(400).json({ success: false, error: "Timeframe must be '1h' or '1month'" });
        }

        // Fetch transactions from subgraph
        const transactions = await fetchTransactions(token as `0x${string}`, period.start, period.end);

        if (transactions.length === 0) {
            return res.json({
                success: true,
                token,
                timeframe,
                period,
                candles: [],
            });
        }

        // Aggregate based on timeframe
        const candles = timeframe === "1h" 
            ? get1hView(transactions) 
            : getMonthlyView(transactions);

        res.json({
            success: true,
            token,
            timeframe,
            period,
            candles,
            count: candles.length,
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
})

