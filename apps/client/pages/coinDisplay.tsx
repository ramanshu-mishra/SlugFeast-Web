"use client"

import { useState } from "react";
import useGetCoins from "../hooks/useGetTokens"
import { RotateCw } from "lucide-react"
import { cn } from "../utility/cn";
import Image from "next/image";
import {motion} from "motion/react"
import { useRouter } from "next/navigation";

interface Coin {
    id: string;
    address: string;
    tokenName: string;
    symbol: string;
    imageUrl: string;
    description: string;
    userId: string;
    graduated: boolean;
    user: {
        publicKey: string;
        name: string | null;
        email: string | null;
    };
    socials: {
        instagram: string | null;
        x: string | null;
        telegram: string | null;
        youtube: string | null;
        website: string | null;
    } | null;
}

export default function CoinDisplay() {
    const [page, setPage] = useState<number>(1);
    const { data, error, isLoading, refetch } = useGetCoins(page);
    
    return (
        <>
            <div className="flex flex-wrap p-4 gap-6">
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
                        <CoinCard key={coin.id} coin={coin} />
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

function CoinCard({ coin }: { coin: Coin }) {
    const router = useRouter();
    const shortAddress = coin.userId.slice(0, 4) + "..." + coin.userId.slice(-4);

    return (
        <motion.div className="flex gap-3 rounded-md bg-muted basis-[23%] h-40 overflow-hidden cursor-pointer hover:bg-muted/80 transition-colors mt-2 mb-2 "
        whileHover={{
            scale: 1.02
        }}
        transition={{
            duration: 0.05
        }}
        whileTap={{
            scale: 0.98
        }}
        onClick={()=>{
            router.push(`/coin/${coin.address}`)
        }}
        >
            {/* Coin image */}
            <div className="basis-[33.3%] shrink-0 h-full relative">
                <img
                    src={coin.imageUrl}
                    alt={coin.tokenName}
                    className="object-cover rounded-xl"
                />
            </div>

            {/* Right side info */}
            <div className="flex flex-col flex-1 py-2 pr-2 gap-1 min-w-0 h-full truncate">
                {/* Token name */}
                <p className="text-lg font-semibold text-white leading-tight truncate">
                    {coin.tokenName}
                </p>

                {/* Symbol */}
                <p className="text-sm font-medium text-gray-400 truncate">
                    {coin.symbol}
                </p>

                {/* Creator */}
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <p className="text-xs text-gray-400 truncate">{shortAddress}</p>
                </div>


                {/* Description */}
                <p className="text-xs text-gray-500  whitespace-normal overflow-hidden">
                    {coin.description}
                </p>
            </div>
        </motion.div>
    )
}