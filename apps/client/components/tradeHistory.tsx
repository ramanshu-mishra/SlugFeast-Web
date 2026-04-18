"use client"

import { TradeEvent } from "@repo/messaging/interfaces";
import { useEffect, useMemo, useRef, useState } from "react"
import { CoinRTCManager } from "../serviceClasses/coinRTCManager";
import { Loader2, Timer } from "lucide-react";
import { useFetchTradeEvents } from "../hooks/useFetchTradeEvents";

type TradeSortOrder = "asc" | "desc";

function mergeTradeEvents(existingTrades: TradeEvent[], incomingTrades: TradeEvent[]): TradeEvent[] {
    const byTxnHash = new Map<string, TradeEvent>();

    for (const trade of existingTrades) {
        byTxnHash.set(trade.data.txnHash, trade);
    }

    for (const trade of incomingTrades) {
        byTxnHash.set(trade.data.txnHash, trade);
    }

    return Array.from(byTxnHash.values());
}

function sortTradeEvents(trades: TradeEvent[], sortOrder: TradeSortOrder): TradeEvent[] {
    return [...trades].sort((left, right) => {
        const leftTimestamp = Number(left.data.timestamp ?? left.data.timestamp ?? 0);
        const rightTimestamp = Number(right.data.timestamp ?? right.data.timestamp ?? 0);

        if (leftTimestamp !== rightTimestamp) {
            return sortOrder === "asc"
                ? leftTimestamp - rightTimestamp
                : rightTimestamp - leftTimestamp;
        }

        if (sortOrder === "asc") {
            return left.data.txnHash.localeCompare(right.data.txnHash);
        }

        return right.data.txnHash.localeCompare(left.data.txnHash);
    });
}

export function TradeHistory({coinAddress}: {coinAddress: `0x${string}`}){
    const manager = useMemo(() => CoinRTCManager.getCoinRTCManager(), []);
    const [liveTrades, setLiveTrades] = useState<TradeEvent[]>([]);
    const [sortOrder, setSortOrder] = useState<TradeSortOrder>("desc");
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);
    const {tradeEvents, isFetchingNextPage, hasNextPage, tradeEventsError, tradeEventsLoading, tradeEventsFetching, fetchNextTradeEvents, refetchTradeEvents, activeSortOrder} = useFetchTradeEvents({coinAddress, sortOrder});

    const displayedTrades = useMemo(() => {
        const mergedTrades = mergeTradeEvents(tradeEvents, liveTrades);
        return sortTradeEvents(mergedTrades, activeSortOrder);
    }, [tradeEvents, liveTrades, activeSortOrder]);


    useEffect(()=>{
            const unsubscribe = manager.add_trade_listener(coinAddress, (trade: TradeEvent)=>{
                setLiveTrades((existingTrades) => {
                    return mergeTradeEvents(existingTrades, [trade]);
                });
            });

            return () => {
                unsubscribe();
            };
        }, [manager, coinAddress]);

    useEffect(() => {
        setLiveTrades([]);
    }, [coinAddress, sortOrder]);

    useEffect(() => {
        void refetchTradeEvents();
    }, [sortOrder, coinAddress, refetchTradeEvents]);

    const hasTrades = displayedTrades.length > 0;
    const isInitialLoading = !hasTrades && !tradeEventsError && (tradeEventsLoading || tradeEventsFetching);
    const isEmptyAfterLoad = !hasTrades && !tradeEventsError && !isInitialLoading;
    const isAppending = hasTrades && isFetchingNextPage;

    useEffect(() => {
        const sentinel = loadMoreSentinelRef.current;
        const root = scrollContainerRef.current;

        if (!sentinel || !root) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) {
                    return;
                }

                if (!hasNextPage || isFetchingNextPage) {
                    return;
                }

                void fetchNextTradeEvents();
            },
            {
                root,
                rootMargin: "200px 0px",
                threshold: 0,
            },
        );

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextTradeEvents, displayedTrades.length]);


    return (
        <div ref={scrollContainerRef} className="flex flex-col gap-3 h-full overflow-auto">
            <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-2">
                    <div className="text-sm text-neutral-400">Trades</div>
                    <div>
                        
                    </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <button
                        type="button"
                        className={`rounded-full px-3 py-1 ${sortOrder === "desc" ? "bg-neutral-800 text-white" : "bg-neutral-900 text-neutral-400"}`}
                        onClick={() => setSortOrder("desc")}
                    >
                        Newest
                    </button>
                    <button
                        type="button"
                        className={`rounded-full px-3 py-1 ${sortOrder === "asc" ? "bg-neutral-800 text-white" : "bg-neutral-900 text-neutral-400"}`}
                        onClick={() => setSortOrder("asc")}
                    >
                        Oldest
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-[1.2fr_0.6fr_0.8fr_0.8fr_1fr_0.9fr] gap-3 text-xs uppercase tracking-wide text-neutral-500">
                <div>Account</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Eth</div>
                <div className="flex gap-1 items-center">Time <Timer className="h-4 -translate-y-0.5" /></div>
                <div>Txn</div>
            </div>

            <div className="flex flex-col gap-2">
                {tradeEventsError ? (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                        Could not load trades
                    </div>
                ) : null}

                {displayedTrades.map((trade) => (
                    <div
                        key={trade.data.txnHash}
                        className="grid grid-cols-[1.2fr_0.6fr_0.8fr_0.8fr_1fr_0.9fr] gap-3 rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-200"
                    >
                        <div className="truncate text-neutral-400">{trade.coinAddress}</div>
                        <div className="text-neutral-300">{trade.data.event}</div>
                        <div>{trade.data.amountInToken.toLocaleString()}</div>
                        <div>{trade.data.amountInEth.toLocaleString()}</div>
                        <div className="text-neutral-400">{new Date(Number(trade.data.timestamp) * 1000).toLocaleString()}</div>
                        <div className="truncate text-neutral-500">{trade.data.txnHash}</div>
                    </div>
                ))}

                {isInitialLoading ? (
                    <div className="flex min-h-40 items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-neutral-300" />
                    </div>
                ) : null}

                {isEmptyAfterLoad ? (
                    <div className="flex min-h-24 items-center justify-center text-sm text-neutral-400">
                        Be the first mover Brother.
                    </div>
                ) : null}

                {hasNextPage ? (
                    <div ref={loadMoreSentinelRef} className="h-1 w-full" aria-hidden="true" />
                ) : null}

                {isAppending ? (
                    <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-5 w-5 animate-spin text-neutral-300" />
                    </div>
                ) : null}
            </div>
        </div>
    )
}