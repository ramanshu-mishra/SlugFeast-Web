import WebSocket from "ws";
import type {IncomingMessage} from "http";
import bcrypt from "bcrypt";
import {prisma} from "@repo/database/client";

export async function validateConnection(ws: WebSocket, req: IncomingMessage){
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
}




export function sendMessage(ws: WebSocket, message: object) {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    }
}