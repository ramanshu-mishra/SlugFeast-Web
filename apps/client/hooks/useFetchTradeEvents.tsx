"use client"

import { TradeEvent } from "@repo/messaging/interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { isAddress } from "viem";

export type TradeSortOrder = "asc" | "desc";

interface TradeEventsPagination {
	currentPage: number;
	pageSize: number;
	totalTrades: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

interface TradeEventsRoutePayload {
	tradeEvents: TradeEvent[];
	pagination: TradeEventsPagination;
	sortOrder: TradeSortOrder;
}

interface TradeEventsRouteResponse {
	success: boolean;
	data: TradeEventsRoutePayload;
	message?: string;
}

async function fetchTradeEvents({
	coinAddress,
	page,
	sortOrder,
}: {
	coinAddress: `0x${string}`;
	page: number;
	sortOrder: TradeSortOrder;
}) {
	const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
	if (!serverAddress) {
		throw new Error("NEXT_PUBLIC_SERVER_ADDRESS is not configured");
	}

	const res = await fetch(`${serverAddress}/tradeEvents/${coinAddress}/${page}?sort=${sortOrder}`);
	const payload = await res.json() as TradeEventsRouteResponse;

	if (!res.ok || !payload.success) {
		throw new Error(payload.message ?? "Could not fetch trade events");
	}

	return payload.data;
}

export function useFetchTradeEvents({
	coinAddress,
	sortOrder = "desc",
}: {
	coinAddress: `0x${string}` 
	sortOrder?: TradeSortOrder;
}) {
	const isValidAddress = isAddress(coinAddress as `0x${string}`);

	const query = useInfiniteQuery({
		queryKey: ["trade-events", coinAddress, sortOrder],
		queryFn: ({ pageParam }) => fetchTradeEvents({
			coinAddress: coinAddress as `0x${string}`,
			page: Number(pageParam),
			sortOrder,
		}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (!lastPage.pagination.hasNextPage) {
				return undefined;
			}

			return lastPage.pagination.currentPage + 1;
		},
		enabled: isValidAddress,
		refetchOnReconnect: true,
        refetchInterval: 10000
	});

	const tradeEvents = useMemo<TradeEvent[]>(() => {
		const rows = query.data?.pages.flatMap((page) => page.tradeEvents) ?? [];
		const uniqueByHash = new Map<string, TradeEvent>();

		for (const row of rows) {
			uniqueByHash.set(row.data.txnHash, row);
		}

		return Array.from(uniqueByHash.values());
	}, [query.data]);

	const latestPage = query.data?.pages[query.data.pages.length - 1];

	return {
		tradeEvents,
		tradeEventPages: query.data?.pages ?? [],
		pagination: latestPage?.pagination,
		activeSortOrder: latestPage?.sortOrder ?? sortOrder,
		hasNextPage: Boolean(query.hasNextPage),
		isFetchingNextPage: query.isFetchingNextPage,
		tradeEventsFetching: query.isFetching,
		fetchNextTradeEvents: query.fetchNextPage,
		tradeEventsLoading: query.isLoading,
		tradeEventsError: query.error,
		refetchTradeEvents: query.refetch,
	};
}
