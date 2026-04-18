"use client"

import { RefObject, useEffect, useState } from "react";
import { useFetchReplies } from "../hooks/useFetchReplies"
import { Spinner } from "./spinner";
import { StoredMessage } from "@repo/messaging/interfaces";
import { messageManager } from "../serviceClasses/messageManager";
import { RelativeTimeText } from "./RelativeTimeText";
import { CommentMedia } from "./commentMedia";
import { useConnection } from "wagmi";

type SortOrder = "newest" | "oldest";

const sortMessagesByOrder = (
    messages: StoredMessage[],
    sortOrder: SortOrder
) => {
    return [...messages].sort((left, right) => {
        const leftTimestamp = new Date(left.dateTime).getTime();
        const rightTimestamp = new Date(right.dateTime).getTime();

        return sortOrder === "newest"
            ? rightTimestamp - leftTimestamp
            : leftTimestamp - rightTimestamp;
    });
};

const mergeMessagesById = (messages: StoredMessage[]) => {
    const messageMap = new Map<string, StoredMessage>();

    for (const message of messages) {
        messageMap.set(message.id, message);
    }

    return Array.from(messageMap.values());
};

export function RepliesDisplay({
    coinAddress,
    messageId,
    sortOrder,
    scrollContainerRef
}: {
    coinAddress: `0x${string}`;
    messageId: string;
    sortOrder: SortOrder;
    scrollContainerRef: RefObject<HTMLDivElement>
}) {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState<StoredMessage[]>([]);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [replySubmitError, setReplySubmitError] = useState<string | null>(null);
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);
    const { address, isConnected } = useConnection();

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
        if (repliesData.length === 0) {
            return;
        }

        setMessages((existingMessages) =>
            sortMessagesByOrder(
                mergeMessagesById([...existingMessages, ...repliesData]),
                sortOrder
            )
        );
    }, [repliesData, sortOrder]);

    useEffect(() => {
        const manager = messageManager.getMessageManager();
        const unsubscribe = manager.addListeners((incomingMessage) => {
            if (incomingMessage.referencedMessageId !== messageId) {
                return;
            }

            setMessages((existingMessages) =>
                sortMessagesByOrder(
                    mergeMessagesById([...existingMessages, incomingMessage]),
                    sortOrder
                )
            );
        });

        return () => {
            unsubscribe();
        };
    }, [messageId, sortOrder]);

    useEffect(() => {
        setMessages((existingMessages) => sortMessagesByOrder(existingMessages, sortOrder));
    }, [sortOrder]);

    const handleReplySubmit = () => {
        const trimmedReply = replyText.trim();

        if (!trimmedReply) {
            setReplySubmitError("Reply cannot be empty");
            return;
        }

        if (!isConnected || !address) {
            setReplySubmitError("Connect wallet to reply");
            return;
        }

        const manager = messageManager.getMessageManager();

        setIsSubmittingReply(true);
        setReplySubmitError(null);

        const didSend = manager.sendMessage({
            userKey: address,
            coinId: coinAddress,
            messageType: "text",
            message: trimmedReply,
            referencedMessageId: messageId,
        });

        setIsSubmittingReply(false);

        if (!didSend) {
            setReplySubmitError("WebSocket not ready");
            return;
        }

        setReplyText("");
        setShowReplyInput(false);
    };

    const handleReplyKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleReplySubmit();
        }
    };

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
                {messages.length > 0 && !visible && (
                    <button
                        onClick={() => setVisible(true)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                    >
                        View {messages.length} {messages.length === 1 ? "reply" : "replies"}
                    </button>
                )}
                {!showReplyInput ? (
                    <button
                        onClick={() => {
                            setReplySubmitError(null);
                            setShowReplyInput(true);
                        }}
                        className="text-xs text-neutral-400 hover:text-neutral-300"
                    >
                        Reply
                    </button>
                ) : (
                    <div className="flex items-center gap-2 w-full">
                        <input
                            value={replyText}
                            onChange={(event) => setReplyText(event.target.value)}
                            onKeyDown={handleReplyKeyDown}
                            placeholder="Write a reply"
                            className="w-full rounded bg-neutral-800 border border-neutral-700 px-2 py-1 text-xs text-neutral-100 focus:outline-none focus:border-neutral-500"
                        />
                        <button
                            type="button"
                            onClick={handleReplySubmit}
                            disabled={isSubmittingReply}
                            className="text-xs text-emerald-400 hover:text-emerald-300 disabled:text-neutral-500"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setReplyText("");
                                setReplySubmitError(null);
                                setShowReplyInput(false);
                            }}
                            className="text-xs text-neutral-400 hover:text-neutral-300"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
            {replySubmitError ? (
                <p className="text-xs text-red-400">{replySubmitError}</p>
            ) : null}

            {messages.length > 0 && (
                visible ? (
                    <>
                        <button
                            onClick={() => setVisible(false)}
                            className="text-xs text-blue-400 hover:text-blue-300 font-semibold self-start"
                        >
                            Hide replies
                        </button>
                        {messages.map((reply: StoredMessage) => (
                            <div key={reply.id} className="flex flex-col gap-2">
                                <div className="bg-neutral-900 rounded p-3">
                                    <div className="flex gap-2 mb-2">
                                        <div className="rounded-full h-6 w-6 bg-yellow-300 shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-neutral-200">
                                                {reply.userKey.slice(0, 6)}...{reply.userKey.slice(-4)}
                                            </p>
                                        </div>
                                    </div>
                                    {reply.referencedImage ? (
                                        <CommentMedia
                                            src={reply.referencedImage.address} 
                                            alt="reply image" 
                                            className="max-w-xs rounded mb-2"
                                        />
                                    ) : null}
                                    {reply.message ? (
                                        <p className="text-sm text-neutral-100 mb-2">{reply.message}</p>
                                    ) : null}
                                    {reply.dateTime ? (
                                        <RelativeTimeText
                                            dateTime={reply.dateTime}
                                            refreshIntervalMs={60_000}
                                            alignToIntervalBoundary
                                            className="text-xs text-neutral-500"
                                        />
                                    ) : null}
                                </div>
                                {/* Recursively render nested replies */}
                                <RepliesDisplay
                                    coinAddress={coinAddress}
                                    messageId={reply.id}
                                    sortOrder={sortOrder}
                                    scrollContainerRef={scrollContainerRef}
                                />
                            </div>
                        ))}
                        {isFetchingNextPage && visible && (
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
