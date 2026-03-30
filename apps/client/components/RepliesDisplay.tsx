"use client"

import { RefObject, useEffect, useState } from "react";
import { useFetchReplies } from "../hooks/useFetchReplies"
import { Spinner } from "./spinner";

type SortOrder = "newest" | "oldest";

interface Reply {
    id: string;
    [key: string]: any;
}

function formatTimeAgo(dateTime: string): string {
    const now = Date.now();
    const then = new Date(dateTime).getTime();
    const diffMs = now - then;
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
}

export function RepliesDisplay({
    messageId,
    sortOrder,
    scrollContainerRef
}: {
    messageId: string;
    sortOrder: SortOrder;
    scrollContainerRef: RefObject<HTMLDivElement>
}) {
    const [visible, setVisible] = useState(false);

    const {
        repliesData,
        replyError,
        isFetchingNextPage,
        loadingError
    } = useFetchReplies({
        messageId,
        scrollContainerRef,
        sortOrder
    });

    useEffect(() => {
        if (repliesData.length > 0) {
            setVisible(true);
        }
    }, [repliesData.length]);
    
    if (loadingError) {
        return (
            <div className="flex justify-center py-4">
                <Spinner />
            </div>
        );
    }

    if (replyError) {
        return (
            <div className="text-red-500 text-sm py-2">
                Error loading replies
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2   ">
            <div className="flex gap-3 items-center">
                {repliesData.length > 0 && !visible && (
                    <button
                        onClick={() => setVisible(true)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                    >
                        View {repliesData.length} {repliesData.length === 1 ? "reply" : "replies"}
                    </button>
                )}
                <button className="text-xs text-neutral-400 hover:text-neutral-300">
                    Reply
                </button>
            </div>

            {repliesData.length > 0 && (
                visible ? (
                    <>
                        <button
                            onClick={() => setVisible(false)}
                            className="text-xs text-blue-400 hover:text-blue-300 font-semibold self-start"
                        >
                            Hide replies
                        </button>
                        {(repliesData as Reply[]).map((reply: Reply) => (
                            <div key={reply.id} className="flex flex-col gap-2">
                                <div className="bg-neutral-900 rounded p-3">
                                    <div className="flex gap-2 mb-2">
                                        <div className="rounded-full h-6 w-6 bg-yellow-300 shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-neutral-200">
                                                {reply.user?.name || "Anonymous"}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {reply.user?.publicKey?.slice(0, 6)}...{reply.user?.publicKey?.slice(-4)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-100 mb-2">{reply.text || reply.content}</p>
                                    {reply.referencedImage && (
                                        <img 
                                            src={reply.referencedImage.url} 
                                            alt="reply image" 
                                            className="max-w-xs rounded mb-2"
                                        />
                                    )}
                                    <p className="text-xs text-neutral-500">
                                        {reply.dateTime ? formatTimeAgo(reply.dateTime) : ""}
                                    </p>
                                </div>
                                {/* Recursively render nested replies */}
                                <RepliesDisplay
                                    messageId={reply.id}
                                    sortOrder={sortOrder}
                                    scrollContainerRef={scrollContainerRef}
                                />
                            </div>
                        ))}
                        {isFetchingNextPage && (
                            <div className="flex justify-center py-2">
                                <Spinner />
                            </div>
                        )}
                    </>
                ) : null
            )}
        </div>
    );
}
