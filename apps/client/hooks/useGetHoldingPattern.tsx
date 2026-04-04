"use client"

import {  useQuery } from "@tanstack/react-query"

interface holdingReturnTypeInterface{
    success: boolean,
    coinId: `0x${string}`,
    holding: holdingInterface[]
}

interface holdingInterface{
    
        userAddress: `0x${string}`
        amount: number,
        percentageofHolding: number ,
    
}

async function getHoldingPattern(coinAddress: `0x${string}`){
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
    const res = await fetch(`${serverAddress}/getHoldings/${coinAddress}`);
    if(!res.ok){
        throw new Error("Could not fetch Holding Info");
        return;
    }
    const data  = await res.json();
    console.log("whatup bro : ",data);
    return data;
}

export function useGetHoldingPattern({coinAddress}:{coinAddress: `0x${string}`}){
    const {data, error, isLoading} = useQuery({
        queryKey: ["HoldingPattern"],
        queryFn : ()=>getHoldingPattern(coinAddress),
        refetchInterval : 5000,
        refetchOnReconnect: true
    });

    return {holdingData:data as holdingReturnTypeInterface, holdingError: error, holdingLoading: isLoading}
}