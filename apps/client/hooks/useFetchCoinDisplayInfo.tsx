"use client";

import { useQuery } from "@tanstack/react-query";


async function fetchCoinDisplayInfo(coinAddress: `0x${string}`){
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS;
    const res = await fetch(`${serverAddress}/getInfo/${coinAddress}`);
    const data = await res.json();
    if(!res.ok){
        throw new Error(data.message);
    }
    return data;
}

export function useFetchCoinDisplayInfo(coinAddress: `0x${string}`){
    const {data, isLoading, error} = useQuery({
        queryFn: ()=>{},
        queryKey : [`coinDisplayInfo-${coinAddress}`],
        retry: (failureCount: number = 2, error: Error) => true,
        refetchOnReconnect : true,
        refetchOnMount : true,
        refetchOnWindowFocus: true
    });
    return {
        data, isLoading, error
    }
}