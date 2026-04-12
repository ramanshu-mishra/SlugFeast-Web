"use client"

import {  RefObject, useEffect, useRef, useState } from "react"
import { CommentDisplay } from "./CommentDisplay";
import { messageManager, OutgoingMessagePayload } from "../serviceClasses/messageManager";
import { useConnection } from "wagmi";
import { StoredMessage } from "@repo/messaging/interfaces";
import { InputSection, InputSectionSendPayload } from "./inputSection";
import { useGetPresignedUrl } from "../hooks/useGetPresignedUrl";

const sortMessagesByOrder = (
    messages: StoredMessage[],
    sortOrder: "newest" | "oldest"
) => {
    return [...messages].sort((left, right) => {
        const leftTimestamp = new Date(left.dateTime).getTime();
        const rightTimestamp = new Date(right.dateTime).getTime();

        return sortOrder === "newest"
            ? rightTimestamp - leftTimestamp
            : leftTimestamp - rightTimestamp;
    });
};

const mergeMessagesById = (messages: StoredMessage[]) => {
    const messageMap = new Map<string, StoredMessage>();

    for (const message of messages) {
        messageMap.set(message.id, message);
    }

    return Array.from(messageMap.values());
};

export function Comments({coinAddress}:{coinAddress : `0x${string}`}){
    const userImage = "something";
    const [sortOrder, setSortOrder] = useState<"newest"|"oldest">("newest"); 
    const [messages, setMessages] = useState<StoredMessage[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const _messageManagerRef: RefObject<messageManager|null> = useRef(null);
    const pendingMessageRef = useRef<OutgoingMessagePayload | null>(null);
    const sendTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const {address, isConnected} = useConnection();
    const { getPresignedUrl } = useGetPresignedUrl();

    const uploadCommentAttachment = async (file: File, publicKey: `0x${string}`) => {
        const { uploadUrl, publicUrl } = await getPresignedUrl(publicKey, file.type, file.name);

        const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!uploadResponse.ok) {
            throw new Error("Failed to upload attachment");
        }

        return publicUrl;
    };

    const clearPendingSend = () => {
        if (sendTimeoutRef.current) {
            clearTimeout(sendTimeoutRef.current);
            sendTimeoutRef.current = null;
        }

        pendingMessageRef.current = null;
        setIsSending(false);
    };

    const getMessageImageUrl = (message: StoredMessage) => message.referencedImage?.address ?? null;

    const doesMatchPendingMessage = (incomingMessage: StoredMessage) => {
        const pendingMessage = pendingMessageRef.current;

        if (!pendingMessage) {
            return false;
        }

        const incomingImageUrl = getMessageImageUrl(incomingMessage);
        const pendingImageUrl = pendingMessage.imageUrl ?? null;

        return incomingMessage.userKey === pendingMessage.userKey
            && incomingMessage.coinId === pendingMessage.coinId
            && incomingMessage.message === (pendingMessage.message ?? null)
            && incomingImageUrl === pendingImageUrl
            && incomingMessage.referencedMessageId === (pendingMessage.referencedMessageId ?? null);
    };

    const handleSendMessage = async ({ text, attachment }: InputSectionSendPayload) => {
        const trimmedText = text.trim();
        const hasText = Boolean(trimmedText);
        const hasImage = Boolean(attachment?.file);

        if ((!hasText && !hasImage) || !isConnected || !address || !_messageManagerRef.current) {
            return false;
        }

        if (isSending) {
            return false;
        }

        let messageType: OutgoingMessagePayload["messageType"] = "text";

        if (hasText && hasImage) {
            messageType = "hybrid";
        } else if (hasImage) {
            messageType = "image";
        }

        let imageUrl: string | undefined;

        if (attachment?.file) {
            try {
                imageUrl = await uploadCommentAttachment(attachment.file, address);
            } catch (error) {
                console.error("Failed to upload comment image", error);
                setSendError(error instanceof Error ? error.message : "Failed to upload comment image");
                return false;
            }
        }

        const outgoingPayload: OutgoingMessagePayload = {
            userKey: address,
            coinId: coinAddress,
            messageType,
            message: hasText ? trimmedText : undefined,
            imageUrl,
        };

        pendingMessageRef.current = outgoingPayload;
        setSendError(null);
        setIsSending(true);

        if (sendTimeoutRef.current) {
            clearTimeout(sendTimeoutRef.current);
        }

        sendTimeoutRef.current = setTimeout(() => {
            if (pendingMessageRef.current === outgoingPayload) {
                pendingMessageRef.current = null;
                setIsSending(false);
                setSendError("No response from websocket server");
            }
        }, 20000);

        const didSend = _messageManagerRef.current.sendMessage(outgoingPayload);

        if (!didSend) {
            clearPendingSend();
            setSendError("WebSocket not ready");
            return false;
        }

        return true;
    };

    useEffect(()=>{
        _messageManagerRef.current = messageManager.getMessageManager();
        const unsubscribe = _messageManagerRef.current.addListeners((data:StoredMessage)=>{
            if (data.coinId !== coinAddress) {
                return;
            }

            if (data.referencedMessageId) {
                return;
            }

            if (pendingMessageRef.current && doesMatchPendingMessage(data)) {
                clearPendingSend();
            }

            setMessages((existingMessages) =>
                sortMessagesByOrder(mergeMessagesById([...existingMessages, data]), sortOrder)
            );
        });

        const unsubscribeErrors = _messageManagerRef.current.addErrorListeners((error) => {
            clearPendingSend();
            setSendError(error.message);
        });

        return ()=>{
            unsubscribe();
            unsubscribeErrors();
            clearPendingSend();
        };
    }, [coinAddress, sortOrder])

    useEffect(() => {
        setMessages((existingMessages) =>
            sortMessagesByOrder(existingMessages, sortOrder)
        );
    }, [sortOrder]);

    return (
        <div className="h-full">
            <InputSection
                userImage={userImage}
                onSend={handleSendMessage}
                isSending={isSending}
                sendError={sendError}
            ></InputSection>
            <CommentDisplay coinAddress={coinAddress} sortOrder={sortOrder} messages = {messages} setMessages={setMessages}></CommentDisplay>
        </div>
    )
}





