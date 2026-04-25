import "dotenv/config";
import WebSocket, { Server } from "ws";
import express from "express";
import uploadImageRouter from "./routes/uploadImage";
import cors from "cors";
import type { IncomingMessage } from "http";
import { validateConnection, sendMessage } from "@repo/wss-utilities/utilities";
import { MessageManager, MessageManagerError, type StoreMessageInput } from "./messageManager";

type WsIncomingMessage = StoreMessageInput;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));


app.use(uploadImageRouter);

const http_port = Number(process.env.COMMENTS_HTTP_PORT) || 8033;

app.listen(http_port, ()=>{
    console.log(`[Comments http server] running at port ${http_port}`);
})

const messageManager = MessageManager.getMessageManager();

const rawDataToString = (rawData: unknown): string | null => {
    if (typeof rawData === "string") {
        return rawData;
    }

    if (Buffer.isBuffer(rawData)) {
        return rawData.toString();
    }

    if (rawData instanceof ArrayBuffer) {
        return Buffer.from(rawData).toString();
    }

    if (Array.isArray(rawData)) {
        return Buffer.concat(rawData.filter((item): item is Buffer => Buffer.isBuffer(item))).toString();
    }

    return null;
};

const safeParsePayload = (rawData: unknown): WsIncomingMessage | null => {
    try {
        const payload = rawDataToString(rawData);

        if (!payload) {
            return null;
        }

        const parsed = JSON.parse(payload) as unknown;

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return null;
        }

        return parsed as WsIncomingMessage;
    } catch {
        return null;
    }
};

const handleWsMessage = async (ws: WebSocket, rawData: unknown) => {
    const data = safeParsePayload(rawData);

    if (!data) {
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
};

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

    ws.on("message", (rawData) => {
        void handleWsMessage(ws, rawData);
    });

    ws.on("close", () => {
        messageManager.removeUser(ws);
    });

    ws.on("error", () => {
        messageManager.removeUser(ws);
    });
});


