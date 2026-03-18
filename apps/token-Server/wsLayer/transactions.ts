import WebSocket, { Server } from "ws";
import { prisma } from "@repo/database/client";
import bcrypt from "bcrypt";

import { EventType, ActionEnum, TransactionEvents } from "../share/enums";
import { normalizeAddress } from "../utility/normalizeAddress";

interface WsMessage {
    action: ActionEnum;
    events: EventType[] | "Transactions";
    address?: string;
}

type WsAction = ActionEnum;
type WsBroadcastEvent = EventType | TransactionEvents | "Transactions";

const EVENT_TYPES = Object.values(EventType) as EventType[];
const ACTIONS = Object.values(ActionEnum) as ActionEnum[];


const subscribers = new Map<EventType, Set<WebSocket>>();
const transactions = new Map<string, Set<WebSocket>>();

let wss: Server;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isWsAction(value: unknown): value is WsAction {
    return typeof value === "string" && ACTIONS.includes(value as ActionEnum);
}



function getOrCreateSet<K>(map: Map<K, Set<WebSocket>>, key: K): Set<WebSocket> {
    let set = map.get(key);
    if (!set) {
        set = new Set<WebSocket>();
        map.set(key, set);
    }
    return set;
}

function subscribeToAddress(ws: WebSocket, address: string) {
    getOrCreateSet(transactions, normalizeAddress(address)).add(ws);
}

function unsubscribeFromAddress(ws: WebSocket, address: string) {
    const normalizedAddress = normalizeAddress(address);
    const sockets = transactions.get(normalizedAddress);
    if (!sockets) return;
    sockets.delete(ws);
    if (sockets.size === 0) transactions.delete(normalizedAddress);
}

function subscribeToEvents(ws: WebSocket, events: EventType[]) {
    for (const event of events) {
        getOrCreateSet(subscribers, event).add(ws);
    }
}

function unsubscribeFromEvents(ws: WebSocket, events: EventType[]) {
    for (const event of events) {
        const sockets = subscribers.get(event);
        if (!sockets) continue;
        sockets.delete(ws);
        if (sockets.size === 0) subscribers.delete(event);
    }
}

function removeSocketFromAllSubscriptions(ws: WebSocket) {
    for (const sockets of subscribers.values()) {
        sockets.delete(ws);
    }
    for (const [address, sockets] of transactions.entries()) {
        sockets.delete(ws);
        if (sockets.size === 0) transactions.delete(address);
    }
}

function extractTransactionAddress(data: unknown): string | undefined {
    if (!isRecord(data)) return undefined;

    const tokenAddress = data.token;
    if (typeof tokenAddress === "string" && tokenAddress.trim() !== "") {
        return normalizeAddress(tokenAddress);
    }

    const address = data.address;
    if (typeof address === "string" && address.trim() !== "") {
        return normalizeAddress(address);
    }

    return undefined;
}

function parseWsMessage(raw: unknown): WsMessage | null {
    if (!isRecord(raw)) return null;

    const action = raw.action;
    const events = raw.events;
    const address = raw.address;

    if (!isWsAction(action)) return null;

    if (events === "Transactions") {
        return {
            action,
            events,
            address: typeof address === "string" ? address : undefined,
        };
    }

    if (!Array.isArray(events)) return null;

    const parsedEvents = events.filter(
        (event): event is EventType => typeof event === "string" && EVENT_TYPES.includes(event as EventType)
    );

    if (parsedEvents.length === 0 && action !== ActionEnum.SUBSCRIBE_ALL && action !== ActionEnum.UNSUBSCRIBE_ALL) {
        return null;
    }

    return {
        action,
        events: parsedEvents,
        address: typeof address === "string" ? address : undefined,
    };
}

export function startWsServer() {
    const port = Number(process.env.WS_PORT) || 8005;

    wss = new Server({ port }, () => {
        console.log(`[WsServer] listening on port ${port}`);
    });

    wss.on("connection", async (ws: WebSocket, req) => {
        const ip = req.socket.remoteAddress;
        const token = req.headers.authorization;
        const storedToken = (await prisma.apiKeys.findFirst({}))?.apiKey;

        if (!token || !storedToken) {
            sendMessage(ws, { success: false, message: "Missing Api Key" });
            ws.close();
            return;
        }

        const isValid = await bcrypt.compare(token, storedToken);
        if (!isValid) {
            sendMessage(ws, { success: false, message: "Invalid Api Key" });
            ws.close();
            return;
        }

        console.log(`[WsServer] client connected: ${ip}`);

        ws.on("message", (raw) => {
            try {
                const parsed = JSON.parse(raw.toString()) as unknown;
                const data = parseWsMessage(parsed);
                if (!data) {
                    sendMessage(ws, { error: "invalid message" });
                    return;
                }

                const { action, events } = data;

                if (events === "Transactions") {
                    if (!data.address || data.address.trim() === "") {
                        sendMessage(ws, { error: "Coin Address not provided" });
                        return;
                    }

                    if (action === ActionEnum.SUBSCRIBE) {
                        subscribeToAddress(ws, data.address);
                        sendMessage(ws, {
                            status: "subscribed",
                            events,
                            address: normalizeAddress(data.address),
                        });
                        return;
                    }

                    if (action === ActionEnum.UNSUBSCRIBE) {
                        unsubscribeFromAddress(ws, data.address);
                        sendMessage(ws, {
                            status: "unsubscribed",
                            events,
                            address: normalizeAddress(data.address),
                        });
                        return;
                    }

                    sendMessage(ws, { error: `${action} is not supported for Transactions` });
                    return;
                }

                if (action === ActionEnum.SUBSCRIBE) {
                    subscribeToEvents(ws, events);
                    sendMessage(ws, { status: "subscribed", events });
                    return;
                }

                if (action === ActionEnum.UNSUBSCRIBE) {
                    unsubscribeFromEvents(ws, events);
                    sendMessage(ws, { status: "unsubscribed", events });
                    return;
                }

                if (action === ActionEnum.SUBSCRIBE_ALL) {
                    subscribeToEvents(ws, EVENT_TYPES);
                    sendMessage(ws, { status: "subscribed", events: EVENT_TYPES });
                    return;
                }

                if (action === ActionEnum.UNSUBSCRIBE_ALL) {
                    unsubscribeFromEvents(ws, EVENT_TYPES);
                    sendMessage(ws, { status: "unsubscribed", events: EVENT_TYPES });
                }
            } catch {
                sendMessage(ws, { error: "invalid message" });
            }
        });

        ws.on("close", () => {
            removeSocketFromAllSubscriptions(ws);
            console.log(`[WsServer] client disconnected: ${ip}`);
        });
    });
}

/*
  Called by subgraphPoller to push a new event to all subscribed clients.
 */
export function broadcast(eventType: WsBroadcastEvent, data: unknown) {
    if (eventType === EventType.tokenCreated || eventType === EventType.tokenGraduated) {
        const sockets = subscribers.get(eventType);
        if (!sockets?.size) return;

        const payload = JSON.stringify({ event: eventType, data });
        for (const ws of sockets) {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(payload);
            }
        }
        return;
    }

    const address = extractTransactionAddress(data);
    if (!address) return;

    const sockets = transactions.get(address);
    if (!sockets?.size) return;

    const payload = JSON.stringify({ event: eventType, data, address });
    for (const ws of sockets) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(payload);
        }
    }
}

function sendMessage(ws: WebSocket, message: object) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    }
}

export { subscribers, transactions };
