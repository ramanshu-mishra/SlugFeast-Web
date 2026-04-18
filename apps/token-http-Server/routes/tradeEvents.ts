import { Request, Response } from "express";
import { router } from "./SingleRouter";
import Big from "big.js";
import { TradeEvent, TradePoint } from "@repo/messaging/interfaces";

const SUBGRAPH_URL = process.env.SUBGRAPH_URL as string;
const SUBGRAPH_API_KEY = process.env.SUBGRAPH_API_KEY;

const PAGE_SIZE = Number(process.env.TRADE_PAGE_SIZE) || 20;
const TOKEN_DECIMALS = new Big(10).pow(6);
const WEI_SCALE = new Big(10).pow(18);

type SortOrder = "asc" | "desc";

interface TradeEventRow {
    id: string;
    token: string;
    VETH: string;
    amount: string;
    sender?: string;
    poolTokens: string;
    poolVETHs: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
    event: "buy" | "sell";
}

interface GraphQLResponse<T> {
    data?: T;
    errors?: { message: string }[];
}

interface TradeEventPageResponse {
    tokenBoughts?: Array<Omit<TradeEventRow, "event">>;
    tokenSolds?: Array<Omit<TradeEventRow, "event">>;
}

interface TradeEventQueryVariables {
    token: string;
    first: number;
    skip: number;
    orderDirection: SortOrder;
}

interface TradeEventsRouteResponse {
    tradeEvents: TradeEvent[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalTrades: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    sortOrder: SortOrder;
}

const TRADE_EVENTS_QUERY = `
query TradeEvents($token: String!, $first: Int!, $skip: Int!, $orderDirection: OrderDirection!) {
  tokenBoughts(
    where: { token: $token }
    orderBy: blockTimestamp
        orderDirection: $orderDirection
    first: $first
    skip: $skip
  ) {
    id
    token
    VETH
    amount
    sender
    poolTokens
    poolVETHs
    blockNumber
    blockTimestamp
    transactionHash
  }
  tokenSolds(
    where: { token: $token }
    orderBy: blockTimestamp
        orderDirection: $orderDirection
    first: $first
    skip: $skip
  ) {
    id
    token
    VETH
    amount
    sender
    poolTokens
    poolVETHs
    blockNumber
    blockTimestamp
    transactionHash
  }
}`;

async function gql<T, TVariables>(query: string, variables: TVariables): Promise<T> {
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

    if (!res.ok) {
        throw new Error(`Subgraph HTTP ${res.status}`);
    }

    const json = await res.json() as GraphQLResponse<T>;
    if (json.errors?.length) {
        throw new Error(json.errors.map((error) => error.message).join(", "));
    }

    if (!json.data) {
        throw new Error("Subgraph returned no data");
    }

    return json.data;
}

function isValidHexAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function parsePage(value: string | undefined): number {
    const parsed = Number(value ?? "1");
    if (!Number.isFinite(parsed) || parsed < 1) {
        return 1;
    }

    return Math.floor(parsed);
}

function parseSortOrder(value: string | string[] | undefined): SortOrder {
    const rawValue = Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
    const normalized = rawValue.trim().toLowerCase();

    if (normalized === "asc") {
        return "asc";
    }

    if (normalized === "desc" || normalized === "dsc") {
        return "desc";
    }

    return "desc";
}

function buildTradeEvent(row: TradeEventRow): TradeEvent | null {
    const timestamp = row.blockTimestamp 
    

    const amountRawBig = new Big(row.amount);
    if (amountRawBig.lte(0)) {
        return null;
    }

    const tokenAmount = amountRawBig.div(TOKEN_DECIMALS).toNumber();
    if (!Number.isFinite(tokenAmount) || tokenAmount <= 0) {
        return null;
    }

    const vethRawBig = new Big(row.VETH);
    if (vethRawBig.lt(0)) {
        return null;
    }

    const tradedVethAmount = vethRawBig.div(WEI_SCALE).toNumber();
    if (!Number.isFinite(tradedVethAmount) || tradedVethAmount < 0) {
        return null;
    }



  

    const tradePoint: TradePoint = {
        event: row.event,
        timestamp,
        amountInEth: tradedVethAmount,
        amountInToken: tokenAmount,
        txnHash: row.transactionHash,
    };

    return {
        event: "TradeEvent",
        coinAddress: row.token as `0x${string}`,
        data: tradePoint,
    };
}

function buildTradeRow(row: Omit<TradeEventRow, "event">, event: "buy" | "sell"): TradeEventRow {
    return {
        ...row,
        event,
    };
}

router.get("/tradeEvents/:coinAddress/:page", async (req: Request, res: Response) => {
    try {
        const coinAddressParam = req.params.coinAddress;
        const pageParam = req.params.page;
        const sortOrder = parseSortOrder(req.query.sort as string | string[] | undefined);
        const rawAddress = (Array.isArray(coinAddressParam) ? (coinAddressParam[0] ?? "") : (coinAddressParam ?? "")).trim();
        const rawPage = Array.isArray(pageParam) ? (pageParam[0] ?? undefined) : pageParam;
        const page = parsePage(rawPage);

        if (!isValidHexAddress(rawAddress)) {
            res.status(400).json({
                success: false,
                message: "Invalid coin address",
            });
            return;
        }

        const coinAddress = rawAddress.toLowerCase();
        const skip = (page - 1) * PAGE_SIZE;
        const fetchCount = skip + PAGE_SIZE;

        const data = await gql<TradeEventPageResponse, TradeEventQueryVariables>(
            TRADE_EVENTS_QUERY,
            {
                token: coinAddress,
                first: fetchCount,
                skip: 0,
                orderDirection: sortOrder,
            },
        );

        const boughtTrades = (data.tokenBoughts ?? []).map((row) => buildTradeRow(row, "buy"));
        const soldTrades = (data.tokenSolds ?? []).map((row) => buildTradeRow(row, "sell"));

        const trades = [...boughtTrades, ...soldTrades].sort((left, right) => {
            const leftTimestamp = Number(left.blockTimestamp);
            const rightTimestamp = Number(right.blockTimestamp);

            const timestampDelta = sortOrder === "asc"
                ? leftTimestamp - rightTimestamp
                : rightTimestamp - leftTimestamp;

            if (timestampDelta !== 0) {
                return timestampDelta;
            }

            const transactionOrder = sortOrder === "asc"
                ? left.transactionHash.localeCompare(right.transactionHash)
                : right.transactionHash.localeCompare(left.transactionHash);

            if (transactionOrder !== 0) {
                return transactionOrder;
            }

            return sortOrder === "asc"
                ? left.id.localeCompare(right.id)
                : right.id.localeCompare(left.id);
        });

        const tradeEvents = trades.slice(skip, skip + PAGE_SIZE).map((tradeRow) => buildTradeEvent(tradeRow));

        const filteredTradeEvents = tradeEvents.filter((tradeEvent): tradeEvent is TradeEvent => tradeEvent !== null);

        const responseData: TradeEventsRouteResponse = {
            tradeEvents: filteredTradeEvents,
            pagination: {
                currentPage: page,
                pageSize: PAGE_SIZE,
                totalTrades: filteredTradeEvents.length,
                totalPages: page,
                hasNextPage: filteredTradeEvents.length === PAGE_SIZE,
                hasPreviousPage: page > 1,
            },
            sortOrder,
        };

        res.status(200).json({
            success: true,
            data: responseData,
        });

    } catch (error) {
        console.error("Error fetching trade events:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching trade events",
        });
    }
});