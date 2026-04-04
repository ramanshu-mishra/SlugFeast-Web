"use client"

import { useCallback, useState } from "react";

type PresignedUrlResponse = {
    success: boolean;
    uploadUrl: string;
    publicUrl: string;
    key?: string;
    expiresIn?: number;
    message?: string;
};

export function useGetPresignedUrl() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getPresignedUrl = useCallback(async (
        userAddress: `0x${string}`,
        fileType: string,
        fileName: string
    ) => {
        const serverAddress = process.env.NEXT_PUBLIC_COMMENTS_HTTP_SERVER_ADDRESS;

        if (!serverAddress) {
            const configError = new Error("NEXT_PUBLIC_COMMENTS_HTTP_SERVER_ADDRESS is not configured");
            setError(configError);
            throw configError;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${serverAddress}/comments/uploadImage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    publickey: userAddress,
                },
                body: JSON.stringify({
                    fileName,
                    fileType,
                }),
            });

            const rawBody = await response.text();

            let payload: PresignedUrlResponse;

            try {
                payload = JSON.parse(rawBody) as PresignedUrlResponse;
            } catch {
                throw new Error("Presigned URL endpoint returned invalid JSON");
            }

            if (!response.ok || !payload.success || !payload.uploadUrl || !payload.publicUrl) {
                throw new Error(payload.message ?? "Failed to get presigned URL");
            }

            return payload;
        } catch (requestError) {
            const normalizedError = requestError instanceof Error ? requestError : new Error("Failed to get presigned URL");
            setError(normalizedError);
            throw normalizedError;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getPresignedUrl,
        isLoading,
        error
    };
}