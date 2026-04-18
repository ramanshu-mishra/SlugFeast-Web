"use client";

import { Dispatch, memo, RefObject, SetStateAction, useEffect, useRef } from "react";
import { useFetchComments } from "../hooks/useFetchComments";
import { RepliesDisplay } from "./RepliesDisplay";
import { Spinner } from "./spinner";
import { StoredMessage } from "@repo/messaging/interfaces";
import { RotateCcw } from "lucide-react";
import { RelativeTimeText } from "./RelativeTimeText";
import { CommentMedia } from "./commentMedia";

const sortMessagesByOrder = (
  messages: StoredMessage[],
  sortOrder: "newest" | "oldest"
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

function formatUserKey(userKey: string): string {
  if (userKey.length <= 12) {
    return userKey;
  }

  return `${userKey.slice(0, 6)}...${userKey.slice(-4)}`;
}

export const CommentDisplay = memo(({
  coinAddress,
  sortOrder,
  messages,
  setMessages
}: {
  coinAddress: `0x${string}`;
  sortOrder: "newest" | "oldest";
  messages: StoredMessage[];
  setMessages: Dispatch<SetStateAction<StoredMessage[]>>
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { commentsData, commentError, isFetchingNextPage, loadingError, refetchComments } =
    useFetchComments({
      coinAddress,
      scrollContainerRef: containerRef as RefObject<HTMLDivElement>,
      sortOrder,
    });
  useEffect(() => {
    if (commentsData.length === 0) {
      return;
    }

    setMessages((existingMessages) =>
      sortMessagesByOrder(mergeMessagesById([...existingMessages, ...commentsData]), sortOrder)
    );
  }, [commentsData, setMessages, sortOrder]);

  if (commentError) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 py-6">
        <p className="text-red-500 text-sm">Error loading comments</p>
        <button
          type="button"
          onClick={() => void refetchComments()}
          className="inline-flex items-center gap-2 text-sm text-neutral-200 rounded px-3 py-1.5 hover:border-neutral-400"
        >
          <RotateCcw size={25} strokeWidth={2} className="hover:-rotate-360 transition-all duration-300 active:scale-95" />
        </button>
      </div>
    );
  }

  const showBottomLoader = loadingError || isFetchingNextPage;

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col gap-3 overflow-y-auto max-h-150 mt-5"
    >
      {messages.length > 0 ? (
        (messages)
          .filter((comment) => comment.referencedMessageId === null)
          .map((comment) => (
          <div key={comment.id} className="bg-neutral-900 rounded ">
              <div className="flex gap-3">
                <div className="rounded-full h-8 w-8 bg-yellow-300 shrink-0">
                  {/* User avatar image would go here */}
                </div>
                <div className="flex flex-col w-full ">
                  <div className="flex gap-2 relative">
                    <div>
                      <p
                        className="text-sm font-semibold text-neutral-200"
                        title={comment.userKey}
                      >
                        {formatUserKey(comment.userKey)}
                      </p>
                    </div>
                    <RelativeTimeText
                      dateTime={comment.dateTime}
                      refreshIntervalMs={60_000}
                      alignToIntervalBoundary
                      className="text-xs text-neutral-500 flex translate-y-[9%]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    {comment.referencedImage ? (
                      <CommentMedia
                        src={comment.referencedImage.address}
                        alt="comment image"
                        className="w-40 h-40 rounded-xl p-2"
                      />
                    ) : null}
                    {comment.message ? (
                      <p className="text-sm text-neutral-100">
                        {comment.message}
                      </p>
                    ) : null}
                  </div>
                  <RepliesDisplay
              coinAddress={coinAddress}
              messageId={comment.id}
              sortOrder={sortOrder}
              scrollContainerRef={containerRef as RefObject<HTMLDivElement>}
            />
                </div>
              </div>
          </div>
        ))
      ) : !showBottomLoader ? (
        <p className="text-sm text-neutral-500 py-4">No comments yet</p>
      ) : null}
      {showBottomLoader && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}
)

