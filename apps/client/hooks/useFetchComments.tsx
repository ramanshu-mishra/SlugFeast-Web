"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import {  RefObject, useCallback, useEffect, useMemo} from "react"

type SortOrder = "newest" | "oldest";

interface CommentPagination {
    currentPage: number;
    pageSize: number;
    totalComments: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface CommentsRoutePayload {
    comments: unknown[];
    pagination: CommentPagination;
    sortOrder: SortOrder;
}

interface CommentsRouteResponse {
    success: boolean;
    data: CommentsRoutePayload;
    message?: string;
}

async function fetchComments({
    coinAddress,
    sortOrder,
    page,
}: {
    coinAddress: `0x${string}`;
    sortOrder: SortOrder;
    page: number;
}) {
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
    console.log("server address is: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", serverAddress);
    const res = await fetch(`${serverAddress}/comments/${coinAddress}?sort=${sortOrder}&page=${page}`);

    if (!res.ok) {
        throw new Error("Could not fetch Comments");
    }

    const data = await res.json() as CommentsRouteResponse;

    if (!data.success) {
        throw new Error(data.message ?? "Could not fetch Comments");
    }

    return data.data;
}

export function useFetchComments({
    coinAddress,
    sortOrder,
    scrollContainerRef
}: {
    coinAddress: `0x${string}`;
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
        queryKey: ["comments", coinAddress, sortOrder],
        queryFn: ({ pageParam }) => fetchComments({ coinAddress, sortOrder, page: Number(pageParam) }),
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

    const flattenedComments = useMemo(() => {
        return data?.pages.flatMap((page) => page.comments) ?? [];
    }, [data]);

    const latestPage = data?.pages[data.pages.length - 1];

    return {
        commentsData: flattenedComments,
        commentsPages: data?.pages ?? [],
        pagination: latestPage?.pagination,
        activeSortOrder: latestPage?.sortOrder ?? sortOrder,
        hasNextPage: Boolean(hasNextPage),
        isFetchingNextPage,
        fetchNextComments: fetchNextPage,
        commentError: error,
        loadingError: isLoading,
        refetchComments: refetch,
    };
}