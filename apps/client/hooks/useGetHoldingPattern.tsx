"use client"

import {  useQuery } from "@tanstack/react-query"

async function getHoldingPattern(coinAddress: `0x${string}`){
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
    const res = await fetch(`${serverAddress}/getHoldings/${coinAddress}`);
    if(!res.ok){
        throw new Error("Could not fetch Holding Info");
        return;
    }
    const data  = await res.json();
    return data;
}

export function useGetHoldingPatter({coinAddress}:{coinAddress: `0x${string}`}){
    const {data, error, isLoading} = useQuery({
        queryKey: ["HoldingPattern"],
        queryFn : ()=>getHoldingPattern(coinAddress),
        refetchInterval : 20000,
        refetchOnReconnect: true
    });

    return {holdingData:data, holdingError: error, holdingLoading: isLoading}
}