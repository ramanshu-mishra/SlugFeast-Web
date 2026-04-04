"use client";

import { memo, useEffect, useMemo, useState } from "react";

function formatTimeAgo(dateTime: string, now: number): string {
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

export const RelativeTimeText = memo(function RelativeTimeText({
  dateTime,
  className,
  refreshIntervalMs = 60_000,
  alignToIntervalBoundary = false,
}: {
  dateTime: string;
  className?: string;
  refreshIntervalMs?: number;
  alignToIntervalBoundary?: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      setNow(Date.now());
    };

    if (alignToIntervalBoundary) {
      const currentTime = Date.now();
      const delayToBoundary = refreshIntervalMs - (currentTime % refreshIntervalMs);

      timeoutId = setTimeout(() => {
        tick();
        intervalId = setInterval(tick, refreshIntervalMs);
      }, delayToBoundary);
    } else {
      intervalId = setInterval(tick, refreshIntervalMs);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [alignToIntervalBoundary, refreshIntervalMs]);

  const label = useMemo(() => formatTimeAgo(dateTime, now), [dateTime, now]);

  return (
    <span className={className} title={new Date(dateTime).toLocaleString()}>
      {label}
    </span>
  );
});
