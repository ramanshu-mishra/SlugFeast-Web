"use client"

import { useQuery } from "@tanstack/react-query"


async function getToken(key:string){
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
    const res = await fetch(`${serverAddress}/metadata`, {
        method: "GET",
        headers: {
            "address" : key
        }
    });
    
    if(!res.ok) throw new Error("Could not fetch coins");
    return res.json();
}

export function useGetToken(key:string){
    const hasKey = key.trim().length > 0;

    const {data,error,isLoading, refetch} = useQuery({
        queryKey: [`coin-${key}`],
        queryFn : ()=>getToken(key),
        enabled: hasKey,
        retry: (failureCount: number = 2, error: Error) => true 
    });
    return {data,error,isLoading,refetch};
}

