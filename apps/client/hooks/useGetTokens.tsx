"use client"

import { useQuery } from "@tanstack/react-query";


async function getCoins(page: number){
    const serverAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS as string;
    const res = await fetch(`${serverAddress}/getAllCoins`, {
        headers: {
            "page" : page.toString()
        }
    });
    if(!res.ok) throw new Error("Could not fetch coins");
    return res.json();
}

export default function useGetCoins(page: number){
    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['coins'],
        queryFn: () => getCoins(page),
        refetchInterval : 5000
    })
    return { data, error, isLoading, refetch }
}