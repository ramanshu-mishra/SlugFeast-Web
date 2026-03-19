"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react";
import { isAddress } from "viem";

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

export interface OHLCCandle {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface TransactionsResponse {
    success: boolean;
    token: string;
    timeframe: "1h" | "1d";
    period: PeriodInterface;
    candles: OHLCCandle[];
    count?: number;
    error?: string;
}

const serverAdress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;

async function getTransactions(token: string, period: PeriodInterface, timeframe: "1h"|"1d"){
    if (!serverAdress) {
        throw new Error("NEXT_PUBLIC_SERVER_ADDRESS is not configured");
    }

    const res = await fetch(`${serverAdress}/transactions/${token}/${timeframe}`, {
        method: "GET",
        headers:{
            "period" : JSON.stringify(period)
        },
        cache: "no-store",
    });

    const payload = await res.json() as TransactionsResponse;

    if(!res.ok || !payload.success){
        throw new Error(payload.error ?? "Failed to fetch historical transactions");
    }

    return payload;
}

export function useGetTransactions(token: string, timeframe: "1h"|"1d", windowSeconds: number){
    
    const isValid = isAddress(token);
    const nowSeconds = Math.floor(Date.now() / 1000);
    const initialPeriod: PeriodInterface = {
        start: String(nowSeconds - windowSeconds),
        end: String(nowSeconds),
    };

    const query =  useInfiniteQuery({
        queryKey : ["transactions", token, timeframe, windowSeconds],
        queryFn: ({ pageParam }) => getTransactions(token, pageParam, timeframe),
        initialPageParam: initialPeriod,
        getNextPageParam: (lastPage) => {
            const nextEnd = Number(lastPage.period.start) - 1;
            const nextStart = nextEnd - windowSeconds;

            if (nextStart <= 0) {
                return undefined;
            }

            return {
                start: String(nextStart),
                end: String(nextEnd),
            } satisfies PeriodInterface;
        },
        retry : 1,
        enabled: isValid,
    });

    const candles = useMemo(() => {
        const entries = query.data?.pages.flatMap((page) => page.candles) ?? [];
        const uniqueByTimestamp = new Map<number, OHLCCandle>();

        for (const candle of entries) {
            uniqueByTimestamp.set(candle.timestamp, candle);
        }

        return Array.from(uniqueByTimestamp.values()).sort((a, b) => a.timestamp - b.timestamp);
    }, [query.data]);

    const loadMore = async () => {
        if (!query.hasNextPage || query.isFetchingNextPage) {
            return;
        }
        await query.fetchNextPage();
    };

    return {
        candles,
        transactionError: query.error,
        transactionIsLoading: query.isLoading,
        transactionIsFetchingMore: query.isFetchingNextPage,
        transactionRefetch: query.refetch,
        hasMore: Boolean(query.hasNextPage),
        loadMore,
    }
}