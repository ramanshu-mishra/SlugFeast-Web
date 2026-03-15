"use client";

import { useBalance } from "wagmi";

export function useGetWalletBalance({address}: {address: `0x${string}`}){
    const {data, error, isLoading, refetch} = useBalance({
        address: address
    });
    return {data};
}