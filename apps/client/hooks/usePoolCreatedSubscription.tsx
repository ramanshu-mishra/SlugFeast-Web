"use client";
import { useEffect, useState } from "react";
import { getSubscriptionClient } from "../share/graphql/subscriptionClient";
import type { PoolCreatedEvent } from "../share/graphql/types";

const SUBSCRIPTION = `
  subscription OnPoolCreated {
    poolcreateds(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
    ) {
      id
      tokenA
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export function usePoolCreatedSubscription() {
    const [events, setEvents] = useState<PoolCreatedEvent[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const client = getSubscriptionClient();
        const { unsubscribe } = client
            .request({ query: SUBSCRIPTION })
            .subscribe({
                next({ data }: { data: { poolcreateds: PoolCreatedEvent[] } | null }) {
                    const incoming = data?.poolcreateds?.[0];
                    if (!incoming) return;
                    setEvents((prev) => {
                        if (prev.some((e) => e.id === incoming.id)) return prev;
                        return [incoming, ...prev];
                    });
                },
                error(err: unknown) {
                    setError(err instanceof Error ? err : new Error(String(err)));
                },
            });

        return () => unsubscribe();
    }, []);

    return { events, error };
}
