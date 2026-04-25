"use client"

import { useEffect, useRef, useState } from "react";
import useGetCoins from "../hooks/useGetTokens"
import { RotateCw } from "lucide-react"
import { cn } from "../utility/cn";
import Image from "next/image";
import {motion} from "motion/react";
import { useRouter } from "next/navigation";

import { Coin } from "../interfaces/coinInterface";
import { globalCoinDataManager } from "../serviceClasses/globalCoinDataManaget";
import { CoinCard } from "../components/coinCard";

export  function CoinDisplay() {
    const [page, setPage] = useState<number>(1);
    const { data, error, isLoading, refetch } = useGetCoins(page);
    const client = useRef<globalCoinDataManager|null>(null);
    const router = useRouter();

    useEffect(()=>{
        const manager = globalCoinDataManager.getGlobalCoinDataManager();
        client.current = manager;
    },[]);

    useEffect(()=>{
        if (isLoading || error || !data?.coins?.length || !client.current) {
            return;
        }

        const coinAddresses = data.coins.map((coin: Coin) => coin.address);

        try {
            client.current.subscribe(coinAddresses, false);
        } catch (err) {
            console.error("Failed to subscribe to coin updates", err);
        }

        return () => {
            if (!client.current) {
                return;
            }

            try {
                client.current.unsubscribe(coinAddresses, false);
            } catch (err) {
                console.error("Failed to unsubscribe from coin updates", err);
            }
        };
    }, [data, isLoading, error]);


   
    
    return (
        <>
            <div className="flex flex-1 flex-wrap p-4 gap-6 ">
                {
                    isLoading &&
                    Array.from({ length: 10 }).map((e, i) => {
                        return (
                            <div key={i}
                                className={cn("flex gap-3 animate-pulse rounded-md bg-muted basis-[23%] h-30")}>
                                <div className="basis-[33.3%] aspect-auto h-full bg-gray-800/60 rounded-md"></div>
                                <div className="flex flex-col h-full flex-1 gap-2">
                                    <div className="basis-1/6 w-[50%] bg-gray-800/60 rounded-md"></div>
                                    <div className="basis-1/8  w-[40%] bg-gray-800/60 rounded-md"></div>
                                    <div className="basis-1/8  w-[35%] bg-gray-800/60 rounded-md"></div>
                                    <div className="basis-1/7 w-full bg-gray-800/60 rounded-md"></div>
                                    <div className="basis-1/7 w-full bg-gray-800/60 rounded-md"></div>
                                    <div className="basis-1/7 w-[60%] bg-gray-800/60 rounded-md"></div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    data?.coins && data.coins.map((coin: Coin) => (
                        <CoinCard key={coin.id} coin={coin} router={router} />
                    ))
                }
            </div>
            {
                error &&
                <div className="flex justify-center items-center h-full w-full gap-2">
                    <div>Could not fetch Coins</div>
                    <RotateCw className="cursor-pointer" onClick={() => refetch()} />
                </div>
            }
        </>
    )
}

