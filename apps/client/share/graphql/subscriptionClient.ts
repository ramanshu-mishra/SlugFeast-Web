import { SubscriptionClient } from "subscriptions-transport-ws";

let client: SubscriptionClient | null = null;

/**
 * Returns a singleton SubscriptionClient using the legacy `graphql-ws` subprotocol
 * that graph-node v0.41.x supports on ws://localhost:8001
 *
 * Set NEXT_PUBLIC_SUBGRAPH_WS_URL in apps/client/.env:
 *   ws://localhost:8001/subgraphs/name/slug-feast
 */
export function getSubscriptionClient(): SubscriptionClient {
    if (client) return client;

    const url = process.env.NEXT_PUBLIC_SUBGRAPH_WS_URL;
    if (!url) {
        throw new Error(
            "NEXT_PUBLIC_SUBGRAPH_WS_URL is not set. " +
            "Add it to apps/client/.env"
        );
    }

    client = new SubscriptionClient(url, {
        reconnect: true,
        reconnectionAttempts: Infinity,
        connectionParams: {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY}`,
            },
        },
    });

    return client;
}
