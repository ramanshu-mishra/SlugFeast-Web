"use client";
import { useEffect, useState } from "react";
import { getSubscriptionClient } from "../share/graphql/subscriptionClient";
import type { TokenCreatedEvent } from "../share/graphql/types";

const SUBSCRIPTION = `
  subscription OnTokenCreated {
    tokenCreateds(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
    ) {
      id
      token
      internal_id
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export function useTokenCreatedSubscription() {
    const [events, setEvents] = useState<TokenCreatedEvent[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const client = getSubscriptionClient();
        const { unsubscribe } = client
            .request({ query: SUBSCRIPTION })
            .subscribe({
                next({ data }: { data: { tokenCreateds: TokenCreatedEvent[] } | null }) {
                    const incoming = data?.tokenCreateds?.[0];
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
