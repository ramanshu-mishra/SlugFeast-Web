"use client";
import { useEffect, useState } from "react";
import { getSubscriptionClient } from "../share/graphql/subscriptionClient";
import type { TokenSoldEvent } from "../share/graphql/types";

const SUBSCRIPTION = `
  subscription OnTokenSold {
    tokenSolds(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
    ) {
      id
      token
      VETH
      amount
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export function useTokenSoldSubscription() {
    const [events, setEvents] = useState<TokenSoldEvent[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const client = getSubscriptionClient();
        const { unsubscribe } = client
            .request({ query: SUBSCRIPTION })
            .subscribe({
                next({ data }: { data: { tokenSolds: TokenSoldEvent[] } | null }) {
                    const incoming = data?.tokenSolds?.[0];
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
