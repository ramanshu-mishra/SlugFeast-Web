import { randomUUID } from "crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
    imageFile?: Express.Multer.File;
    imageBase64?: string;
    imageMimeType?: string;
    imageName?: string;
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
    private readonly s3Client: S3Client;
    private readonly bucketName: string;
    private readonly region: string;

    private constructor() {
        this.region = process.env.AWS_REGION || "ap-southeast-2";
        this.bucketName = process.env.AWS_S3_BUCKET || "slugfeast-bucket";

        this.s3Client = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
            },
        });
    }

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
        const hasImage = Boolean(input.imageFile);

        if (!input.userKey || !input.coinId || !input.messageType) {
            throw new MessageManagerError("userKey, coinId and messageType are required", 400);
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
                throw new MessageManagerError("Image file is required for messageType=image", 400);
            }
            if (hasText) {
                throw new MessageManagerError("Text is not allowed for messageType=image. Use hybrid instead", 400);
            }
        }

        if (input.messageType === "hybrid" && (!hasText || !hasImage)) {
            throw new MessageManagerError("Both image and text are required for messageType=hybrid", 400);
        }
    }

    private parseBase64Payload(imageBase64: string) {
        const trimmedInput = imageBase64.trim();
        const dataUrlMatch = trimmedInput.match(/^data:(.+?);base64,(.+)$/s);

        if (dataUrlMatch) {
            return {
                mimeTypeFromPayload: dataUrlMatch[1],
                rawBase64: dataUrlMatch[2] || "",
            };
        }

        return {
            mimeTypeFromPayload: undefined,
            rawBase64: trimmedInput,
        };
    }

    private base64ToImageFile(input: StoreMessageInput): Express.Multer.File | undefined {
        if (input.imageFile) {
            return input.imageFile;
        }

        if (!input.imageBase64) {
            return undefined;
        }

        const { mimeTypeFromPayload, rawBase64 } = this.parseBase64Payload(input.imageBase64);
        let buffer: Buffer;

        try {
            buffer = Buffer.from(rawBase64, "base64");
        } catch {
            throw new MessageManagerError("Invalid base64 image payload", 400);
        }

        if (!buffer.length) {
            throw new MessageManagerError("Invalid base64 image payload", 400);
        }

        const mimetype = input.imageMimeType || mimeTypeFromPayload || "application/octet-stream";
        const extension = mimetype.includes("/") ? mimetype.split("/")[1] : "bin";
        const originalname = input.imageName?.trim() || `upload.${extension}`;

        return {
            originalname,
            mimetype,
            buffer,
        } as Express.Multer.File;
    }

    private async uploadImageToS3(file: Express.Multer.File) {
        if (!file.buffer || file.buffer.length === 0) {
            throw new MessageManagerError("Image file payload is empty", 400);
        }

        const fileNameParts = file.originalname.split(".");
        const extension = fileNameParts.length > 1 ? fileNameParts[fileNameParts.length - 1] : "bin";
        const key = `messages/${Date.now()}-${randomUUID()}.${extension}`;

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    }

    async storeMessage(input: StoreMessageInput) {
        const normalizedInput: StoreMessageInput = {
            ...input,
            imageFile: this.base64ToImageFile(input),
        };

        this.validateInput(normalizedInput);

        if (normalizedInput.referencedMessageId) {
            // @ts-ignore
            const referencedMessageExists = await prisma.message.findUnique({
                where: {
                    id: normalizedInput.referencedMessageId,
                },
                select: {
                    id: true,
                },
            });

            if (!referencedMessageExists) {
                throw new MessageManagerError("Referenced message does not exist", 400);
            }
        }

        const imageAddress = normalizedInput.imageFile ? await this.uploadImageToS3(normalizedInput.imageFile) : null;
        const normalizedMessage = normalizedInput.message?.trim() || null;

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

