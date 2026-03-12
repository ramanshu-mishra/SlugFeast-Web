import WebSocket, { Server } from "ws";
import {prisma} from "@repo/database/client";
import bcrypt from "bcrypt";

import { EventType, ActionEnum } from "../share/enums";



interface WsMessage {
    action: ActionEnum;
    events: EventType[];   //right now this events field is of no use , since I'm letting users to subscribe to each event at once. 
}





// subscriber map: eventType → set of connected sockets
const subscribers = new Map<EventType, Set<WebSocket>>();

let wss: Server;

export function startWsServer() {
    const port = Number(process.env.WS_PORT) || 8081;

    wss = new Server({ port }, () => {
        console.log(`[WsServer] listening on port ${port}`);
    });

    wss.on("connection", async(ws: WebSocket, req) => {
        const ip = req.socket.remoteAddress;
        const token = req.headers.authorization;
       

        const stored_token = (await prisma.apiKeys.findFirst({}))?.apiKey;
        

        const validate = bcrypt.compare(token as string, stored_token as string);

        if(!validate){
            ws.send(JSON.stringify({
                success: false,
                message: "Invalid Api Key"
            }));
            ws.close();
            return;
        }

        

        console.log(`[WsServer] client connected: ${ip}`);

        ws.on("message", (raw) => {
            try {
                const msg: WsMessage = JSON.parse(raw.toString());

                // here I'm letting the users subscribe to each of the event at once, In future I'll see whether It creates some performance downsides , then I'll change it to selective subscription of different events.
                if (msg.action === ActionEnum.SUBSCRIBE) {
                    for (const event of msg.events) {
                        if (!subscribers.has(event)) subscribers.set(event, new Set());
                        subscribers.get(event)!.add(ws);
                    }
                    ws.send(JSON.stringify({ status: "subscribed", events: msg.events }));
                }
                
                if(msg.action == ActionEnum.SUBSCRIBE_ALL){
                    Object.values(EventType).map((event)=>{
                        if(!subscribers.has(event))subscribers.set(event, new Set());
                        subscribers.get(event)!.add(ws);
                    });
                    ws.send(JSON.stringify({status: "subscribed", events: ()=>Object.values(EventType).map((event)=>event) }));
                }
                

                if (msg.action === ActionEnum.UNSUBSCRIBE) {
                    for (const event of msg.events) {
                        subscribers.get(event)?.delete(ws);
                    }
                    ws.send(JSON.stringify({ status: "unsubscribed", events: msg.events }));
                }

            } catch {
                ws.send(JSON.stringify({ error: "invalid message" }));
            }
        });

        ws.on("close", () => {
            // clean up all subscriptions for this socket
            for (const set of subscribers.values()) set.delete(ws);
            console.log(`[WsServer] client disconnected: ${ip}`);
        });
    });
}

/*
  Called by subgraphPoller to push a new event to all subscribed clients.
 */
export function broadcast(eventType: EventType, data: unknown) {
    const sockets = subscribers.get(eventType);
    if (!sockets?.size) return;

    const payload = JSON.stringify({ event: eventType, data });
    for (const ws of sockets) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(payload);
        }
    }
}


export {subscribers};
