"use client";

import { useQuery } from "@tanstack/react-query";
import { isAddress } from "viem";

type CoinDisplayInfo = {
    bondingCurveProgress: number;
    marketCap: string;
    currentPrice: string;
    athPrice: string;
    athProgress: string;
    coinAddress: `0x${string}`;
};

type CoinDisplayInfoResponse = {
    success: boolean;
    data: CoinDisplayInfo;
    message?: string;
};




async function fetchCoinDisplayInfo(coinAddress: `0x${string}`): Promise<CoinDisplayInfoResponse> {
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
    if (!serverAddress) {
        throw new Error("NEXT_PUBLIC_SERVER_ADDRESS is not configured");
    }

    const res = await fetch(`${serverAddress}/getInfo/${coinAddress}`);
    const data = (await res.json()) as CoinDisplayInfoResponse;

    if (!res.ok) {
        throw new Error(data.message);
    }

    if (!data || typeof data !== "object" || !data.data) {
        throw new Error("Invalid coin display response");
    }

    return data;
}

export function useFetchCoinDisplayInfo(coinAddress: `0x${string}` | null | undefined){
    const hasValidAddress = isAddress(coinAddress as `0x${string}`);

    const {data, isLoading, error} = useQuery({
        queryFn: () => fetchCoinDisplayInfo(coinAddress as `0x${string}`),
        queryKey : ["coinDisplayInfo", coinAddress],
        enabled: hasValidAddress,
        retry: (failureCount: number) => failureCount < 2,
        refetchOnReconnect : true,
        refetchOnMount : true,
        refetchOnWindowFocus: true
    });

    return {
        data, isLoading, error
    }
}