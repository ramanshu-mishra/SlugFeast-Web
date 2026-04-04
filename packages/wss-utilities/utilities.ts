import WebSocket from "ws";
import type {IncomingMessage} from "http";
import bcrypt from "bcrypt";
import {prisma} from "@repo/database/client";

export async function validateConnection(ws: WebSocket, req: IncomingMessage){
    const ip = req.socket.remoteAddress;
        const rawProtocolHeader = req.headers["sec-websocket-protocol"];
        const token = Array.isArray(rawProtocolHeader)
            ? rawProtocolHeader[0]
            : rawProtocolHeader?.split(",")[0]?.trim();
        const storedToken = (await prisma.apiKeys.findFirst({}))?.apiKey;

        if (!token || !storedToken) {
            sendMessage(ws, { success: false, message: "Missing Api Key" });
            ws.close();
            return;
        }
        
        try{
        const isValid = await bcrypt.compare(token, storedToken);
        if (!isValid) {
            sendMessage(ws, { success: false, message: "Invalid Api Key", token });
            ws.close();
            return;
        }
    }
    catch{
        sendMessage(ws, {
            success: false,
            message: "Invalid API Key"
        });
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