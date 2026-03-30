import WebSocket, { Server } from "ws";
import type { IncomingMessage } from "http";
import { validateConnection, sendMessage } from "@repo/wss-utilities/utilities";
import { MessageManager, MessageManagerError, type StoreMessageInput } from "./messageManager";

type WsIncomingMessage = StoreMessageInput;

const messageManager = MessageManager.getMessageManager();

const wss = new Server(
    {
        port: Number(process.env.MESSAGING_SERVER_PORT) || 8022,
    },
    () => {
        console.log(`[Messaging Server] Running at port ${wss.options.port}`);
    }
);

wss.on("connection", async (ws: WebSocket, req: IncomingMessage) => {
    await validateConnection(ws, req);

    if (ws.readyState !== WebSocket.OPEN) {
        return;
    }

    messageManager.addUser(ws);

    ws.on("message", async (rawData) => {
        let data: WsIncomingMessage;

        try {
            data = JSON.parse(rawData.toString()) as WsIncomingMessage;
        } catch {
            sendMessage(ws, {
                success: false,
                message: "Invalid JSON payload",
            });
            return;
        }

        try {
            const createdMessage = await messageManager.storeMessage(data);

            messageManager.broadcast({
                success: true,
                event: "message_created",
                data: createdMessage,
            });
        } catch (error) {
            if (error instanceof MessageManagerError) {
                sendMessage(ws, {
                    success: false,
                    message: error.message,
                    statusCode: error.statusCode,
                });
                return;
            }

            sendMessage(ws, {
                success: false,
                message: "Internal server error",
            });
        }
    });

    ws.on("close", () => {
        messageManager.removeUser(ws);
    });

    ws.on("error", () => {
        messageManager.removeUser(ws);
    });
});


