"use client";

import { RefObject, useRef } from "react";
import { useFetchComments } from "../hooks/useFetchComments";
import { RepliesDisplay } from "./RepliesDisplay";
import { Spinner } from "./spinner";
import { motion } from "motion/react";

interface Comment {
  id: string;
  user?: {
    name: string;
    publicKey: string;
  };
  text?: string;
  content?: string;
  referencedImage?: {
    url: string;
  };
  dateTime?: string;
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

export function CommentDisplay({
  coinAddress,
  sortOrder,
}: {
  coinAddress: `0x${string}`;
  sortOrder: "newest" | "oldest";
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { commentsData, commentError, isFetchingNextPage, loadingError } =
    useFetchComments({
      coinAddress,
      scrollContainerRef: containerRef as RefObject<HTMLDivElement>,
      sortOrder: "newest",
    });
  if (loadingError) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    );
  }

  if (commentError) {
    return (
      <div className="text-red-500 text-sm py-2">Error loading comments</div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col gap-4 overflow-y-auto max-h-150"
    >
      {commentsData && commentsData.length > 0 ? (
        (commentsData as Comment[]).map((comment: Comment) => (
          <div key={comment.id} className="flex flex-col gap-3">
            <div className="bg-neutral-900 rounded p-4">
              <div className="flex gap-3 mb-2">
                <div className="rounded-full h-8 w-8 bg-yellow-300 shrink-0">
                  {/* User avatar image would go here */}
                </div>
                <div className="flex flex-col w-full ">
                  <div className="flex gap-2 relative">
                    <div>
                      <p
                        className="text-sm font-semibold text-neutral-200"
                        title={comment.user?.publicKey ?? "Unknown address"}
                      >
                        {comment.user?.name || "Anonymous"}
                      </p>
                    </div>
                    <div className="text-xs text-neutral-500 flex  translate-y-[9%] ">
                      {comment.dateTime ? formatTimeAgo(comment.dateTime) : ""}
                    </div>
                  </div>
                  <div className="flex gap-2  w-full">
                    {comment.referencedImage && (
                      <img
                        src={comment.referencedImage.url}
                        alt="comment image"
                        className="max-w-sm rounded mb-3"
                      />
                    )}
                    <p className="text-sm text-neutral-100 my-1">
                      {comment.message}
                    </p>
                  </div>
                  <RepliesDisplay
              messageId={comment.id}
              sortOrder={sortOrder}
              scrollContainerRef={containerRef as RefObject<HTMLDivElement>}
            />
                </div>
              </div>
            </div>

            
          </div>
        ))
      ) : (
        <p className="text-sm text-neutral-500 py-4">No comments yet</p>
      )}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}

//
//
