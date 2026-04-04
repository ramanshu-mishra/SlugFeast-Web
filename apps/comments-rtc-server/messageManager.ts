import { prisma } from "@repo/database/client";
import WebSocket  from "ws";

export type MessageType = "image" | "text" | "hybrid";

const VALID_MESSAGE_TYPES: MessageType[] = ["image", "text", "hybrid"];

type StoreMessageInput = {
    userKey: string;
    coinId: string;
    messageType: MessageType | string;
    message?: string;
    referencedMessageId?: string;
    imageUrl?: string;
};

export type { StoreMessageInput };

class MessageManagerError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

const isValidMessageType = (value: string): value is MessageType => {
    return VALID_MESSAGE_TYPES.includes(value as MessageType);
};

export class MessageManager {
    private users : Set<WebSocket> = new Set();
    private static instance: MessageManager | null = null;
    private constructor() {}

    static getMessageManager() {
        if (MessageManager.instance == null) {
            MessageManager.instance = new MessageManager();
        }
        return MessageManager.instance;
    }

    addUser(user: WebSocket) {
        this.users.add(user);
    }

    removeUser(user: WebSocket) {
        this.users.delete(user);
    }

    private validateInput(input: StoreMessageInput) {
        if (!isValidMessageType(input.messageType)) {
            throw new MessageManagerError("messageType must be one of image, text, hybrid", 400);
        }

        const hasText = Boolean(input.message?.trim());
        const hasImage = Boolean(input.imageUrl?.trim());

        if (!input.userKey || !input.coinId || !input.messageType) {
            throw new MessageManagerError("userKey, coinId and messageType are required", 400);
        }

        if (hasImage) {
            try {
                new URL(input.imageUrl!);
            } catch {
                throw new MessageManagerError("imageUrl must be a valid URL", 400);
            }
        }

        if (input.messageType === "text") {
            if (!hasText) {
                throw new MessageManagerError("Text message content is required for messageType=text", 400);
            }
            if (hasImage) {
                throw new MessageManagerError("Image is not allowed for messageType=text. Use hybrid instead", 400);
            }
        }

        if (input.messageType === "image") {
            if (!hasImage) {
                throw new MessageManagerError("imageUrl is required for messageType=image", 400);
            }
            if (hasText) {
                throw new MessageManagerError("Text is not allowed for messageType=image. Use hybrid instead", 400);
            }
        }

        if (input.messageType === "hybrid" && (!hasText || !hasImage)) {
            throw new MessageManagerError("Both image and text are required for messageType=hybrid", 400);
        }
    }

    async storeMessage(input: StoreMessageInput) {
        const normalizedInput: StoreMessageInput = {
            ...input,
            userKey: input.userKey?.trim(),
            coinId: input.coinId?.trim(),
            message: input.message?.trim(),
            referencedMessageId: input.referencedMessageId?.trim(),
            imageUrl: input.imageUrl?.trim(),
        };

        this.validateInput(normalizedInput);

        // @ts-ignore
        const coinExists = await prisma.coin.findFirst({
            where: {
                address: normalizedInput.coinId,
            },
            select: {
                id: true,
            },
        });

        if (!coinExists) {
            throw new MessageManagerError("coinId does not exist", 400);
        }

        await prisma.user.upsert({
            // @ts-ignore
            where: {
                publicKey: normalizedInput.userKey,
            },
            update: {},
            create: {
                publicKey: normalizedInput.userKey,
            },
        });

        if (normalizedInput.referencedMessageId) {
            // @ts-ignore
            const referencedMessageExists = await prisma.message.findUnique({
                where: {
                    id: normalizedInput.referencedMessageId,
                },
                select: {
                    id: true,
                    coinId: true,
                },
            });

            if (!referencedMessageExists) {
                throw new MessageManagerError("Referenced message does not exist", 400);
            }

            if (referencedMessageExists.coinId !== normalizedInput.coinId) {
                throw new MessageManagerError("Referenced message does not belong to this coin", 400);
            }
        }

        const normalizedMessage = normalizedInput.message || null;
        const imageAddress = normalizedInput.imageUrl || null;

        return prisma.$transaction(async (tx) => {
            // @ts-ignore
            const createdMessage = await tx.message.create({
                data: {
                    userKey: normalizedInput.userKey,
                    coinId: normalizedInput.coinId,
                    message: normalizedMessage,
                    referencedMessage: normalizedInput.referencedMessageId
                        ? {
                                connect: {
                                    id: normalizedInput.referencedMessageId,
                                },
                            }
                        : undefined,
                    referencedImage: imageAddress
                        ? {
                                create: {
                                    address: imageAddress,
                                },
                            }
                        : undefined,
                },
                include: {
                    referencedImage: true,
                    referencedMessage: true,
                },
            });

            return createdMessage;
        });
    }

    broadcast(message: object){
        this.users.forEach(user=>{
            if(user.readyState == WebSocket.OPEN){
                user.send(JSON.stringify(message));
            }
        })
    }
}

export { MessageManagerError };

