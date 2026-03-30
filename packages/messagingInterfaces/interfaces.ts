export interface StoredMessageImage {
    id: string;
    address: string;
    messageId: string;
}

export interface StoredReferencedMessage {
    id: string;
    message: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId: string | null;
    dateTime: string;
}

export interface StoredMessage {
    id: string;
    message: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId: string | null;
    dateTime: string;
    referencedImage: StoredMessageImage | null;
    referencedMessage: StoredReferencedMessage | null;
}

export interface messageResponse {
    success: boolean;
    event?: "message_created";
    data?: StoredMessage;
    message?: string;
    statusCode?: number;
}