"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { RefObject, useCallback, useEffect, useMemo } from "react"

type SortOrder = "newest" | "oldest";

interface RepliesPagination {
    currentPage: number;
    pageSize: number;
    totalReplies: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface RepliesRoutePayload {
    replies: unknown[];
    pagination: RepliesPagination;
    sortOrder: SortOrder;
}

interface RepliesRouteResponse {
    success: boolean;
    data: RepliesRoutePayload;
    message?: string;
}

async function fetchReplies({
    messageId,
    sortOrder,
    page,
}: {
    messageId: string;
    sortOrder: SortOrder;
    page: number;
}) {
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
    const res = await fetch(`${serverAddress}/comments/replies/${messageId}?sort=${sortOrder}&page=${page}`);

    if (!res.ok) {
        throw new Error("Could not fetch Replies");
    }

    const data = await res.json() as RepliesRouteResponse;

    if (!data.success) {
        throw new Error(data.message ?? "Could not fetch Replies");
    }

    return data.data;
}

export function useFetchReplies({
    messageId,
    sortOrder,
    scrollContainerRef
}: {
    messageId: string;
    sortOrder: SortOrder;
    scrollContainerRef: RefObject<HTMLDivElement>
}) {
    const {
        data,
        error,
        isLoading,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["replies", messageId, sortOrder],
        queryFn: ({ pageParam }) => fetchReplies({ messageId, sortOrder, page: Number(pageParam) }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.pagination.hasNextPage) {
                return undefined;
            }

            return lastPage.pagination.currentPage + 1;
        },
        refetchOnReconnect: true,
    });

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        const triggerOffset = 120;
        const currentScrollBottom = container.scrollTop + container.clientHeight;

        if (
            currentScrollBottom >= container.scrollHeight - triggerOffset &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            void fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, scrollContainerRef]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        container.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, scrollContainerRef]);

    const flattenedReplies = useMemo(() => {
        return data?.pages.flatMap((page) => page.replies) ?? [];
    }, [data]);

    const latestPage = data?.pages[data.pages.length - 1];

    return {
        repliesData: flattenedReplies,
        repliesPages: data?.pages ?? [],
        pagination: latestPage?.pagination,
        activeSortOrder: latestPage?.sortOrder ?? sortOrder,
        hasNextPage: Boolean(hasNextPage),
        isFetchingNextPage,
        fetchNextReplies: fetchNextPage,
        replyError: error,
        loadingError: isLoading,
        refetchReplies: refetch,
    };
}