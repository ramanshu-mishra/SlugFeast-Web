"use client";
import {motion} from "motion/react"
import { Coin } from "../interfaces/coinInterface";
import { ATHBar } from "./athBar";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";






export function CoinCard({ coin, router }: { coin: Coin, router: AppRouterInstance }) {
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

                <ATHBar coinAddress={coin.address as `0x${string}`}></ATHBar>


                {/* Description */}
                <p className="text-xs text-gray-500  whitespace-normal overflow-hidden">
                    {coin.description}
                </p>
            </div>
        </motion.div>
    )
}