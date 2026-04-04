"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { RefObject, useCallback, useEffect, useMemo } from "react"
import { StoredMessage } from "@repo/messaging/interfaces";

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

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function toStoredMessage(raw: unknown): StoredMessage | null {
    if (!isObject(raw)) {
        return null;
    }

    const id = typeof raw.id === "string" ? raw.id : null;
    const userKey = typeof raw.userKey === "string" ? raw.userKey : null;
    const coinId = typeof raw.coinId === "string" ? raw.coinId : null;
    const dateTime = typeof raw.dateTime === "string" ? raw.dateTime : null;

    if (!id || !userKey || !coinId || !dateTime) {
        return null;
    }

    const referencedImage = isObject(raw.referencedImage)
        && typeof raw.referencedImage.id === "string"
        && typeof raw.referencedImage.address === "string"
        && typeof raw.referencedImage.messageId === "string"
        ? {
            id: raw.referencedImage.id,
            address: raw.referencedImage.address,
            messageId: raw.referencedImage.messageId,
        }
        : null;

    const referencedMessage = isObject(raw.referencedMessage)
        && typeof raw.referencedMessage.id === "string"
        && (typeof raw.referencedMessage.message === "string" || raw.referencedMessage.message === null)
        && typeof raw.referencedMessage.userKey === "string"
        && typeof raw.referencedMessage.coinId === "string"
        && (typeof raw.referencedMessage.referencedMessageId === "string" || raw.referencedMessage.referencedMessageId === null)
        && typeof raw.referencedMessage.dateTime === "string"
        ? {
            id: raw.referencedMessage.id,
            message: raw.referencedMessage.message,
            userKey: raw.referencedMessage.userKey,
            coinId: raw.referencedMessage.coinId,
            referencedMessageId: raw.referencedMessage.referencedMessageId,
            dateTime: raw.referencedMessage.dateTime,
        }
        : null;

    return {
        id,
        message: typeof raw.message === "string" || raw.message === null ? raw.message : null,
        userKey,
        coinId,
        referencedMessageId:
            typeof raw.referencedMessageId === "string" || raw.referencedMessageId === null
                ? raw.referencedMessageId
                : null,
        dateTime,
        referencedImage,
        referencedMessage,
    };
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

    const flattenedReplies = useMemo<StoredMessage[]>(() => {
        return (data?.pages.flatMap((page) => page.replies) ?? [])
            .map(toStoredMessage)
            .filter((reply): reply is StoredMessage => reply !== null);
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