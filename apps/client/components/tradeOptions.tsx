"use client"
import { LayoutGroup, motion } from "motion/react"
import { useState } from "react";
import { Coin } from "../interfaces/coinInterface";
import useGetTokenReserves from "../hooks/useGetTokenReserves";
import { useGetTokenBalance } from "../hooks/useGetTokenBalance";
import { useAccount, useBalance, useConnection } from "wagmi";
import { useGetWalletBalance } from "../hooks/useGetWalletBalance";
import { cn } from "../utility/cn";
import eth_symbol from "../public/eth_symbol.png";

interface tradeInterface{
    value:string,
    active:boolean
}

export function TradeOptions({coin}:{coin:Coin}) {
    const symbol = coin.symbol as string;
    const [option, setOption] = useState<"Sell" | "Buy">("Buy");
    const [pov, setPov] = useState<"Eth" | string>("Eth");
    const { address, isConnected } = useConnection();
    const [trade,setTrade] = useState<tradeInterface>({
        value: "",
        active: false
    });
    
    // const result = useGetTokenReserves({key: coin.address as string});
    const balance = useGetTokenBalance({
        tokenAddress: coin.address,
        accountAddress: address,
    });
    
    // const {data:ethBalance} = useGetWalletBalance({address:address as `0x${string}`});
    const ethBalance = {value: 45*10**18}

    return (
        <div className="select-none flex flex-1 h-100 flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
            <div className="w-full">
                <LayoutGroup id="trade-option-tabs">
                    <div className="relative grid grid-cols-2 rounded-lg border border-neutral-700 bg-neutral-800/60 p-1">
                        {(["Buy", "Sell"] as const).map((tab) => {
                            const isActive = option === tab;

                            return (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setOption(tab)}
                                    className="relative z-10 h-10 rounded-md text-base font-medium cursor-pointer"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-trade-tab"
                                            className={` absolute inset-0 rounded-md transition-colors duration-300 text-neutral-50 ${tab === "Buy" ? "bg-emerald-600 text-neutral-900" : "bg-red-500 text-neutral-900"}`}
                                            transition={{
                                                layout: { duration: 0.28, ease: "easeInOut" },
                                                duration: 0.28,
                                            }}
                                        />
                                    )}

                                    <span className={` font-bold relative z-20 transition-colors duration-200 ${isActive ? "text-neutral-950" : "text-neutral-300"}`}>
                                        {tab}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </LayoutGroup>
            </div>
            <div className="flex justify-between px-2">
                        <motion.span whileHover={{backgroundColor: "--var(neutral-900)"}} className="text-sm px-2 rounded-md border border-neutral-700 bg-neutral-800 cursor-pointer"
                        onClick={()=>{
                           setPov(e=>e=="Eth"?symbol:"Eth");
                        }}
                        >switch to {pov=="Eth"?symbol:"Eth"}</motion.span>
                        <motion.span whileHover={{backgroundColor: "--var(neutral-900)"}} className="text-sm px-2 rounded-md border border-neutral-700 bg-neutral-800 cursor-pointer">Slippage</motion.span>
            </div>
            <div className="flex justify-between px-2">
                        <span>Balance</span>
                        <span>{pov=="Eth" ? ((Number(ethBalance?.value ?? 0))/Number(10**18)) : balance?  balance.data ? balance.data.toString() : "0" : "0"}</span>
            </div>
            <div className="relative">
                <input
                    type="text"
                    step="any"
                    value={trade.value}
                    placeholder="0.00"
                    className="w-full h-10 rounded-xl bg-neutral-700 px-2"
                    onChange={(e)=>setTrade(tr=>({...tr, value : e.target.value}))}
                />
                <TokenLogo symbol={pov == "Eth" ? "Eth" : symbol} coin={coin} className="absolute right-5 top-1" />
            </div>
            <div className={cn("flex justify-center items-center w-full h-10 rounded-xl text-neutral-800 font-bold border border-neutral-900", option=="Buy"? trade.active ? "bg-emerald-400 cursor-pointer" : "bg-emerald-800 cursor-not-allowed" : trade.active ? "bg-red-400 cursor-pointer" : "bg-red-900 cursor-not-allowed")}>
                {option} {coin.symbol.slice(0,1).toUpperCase()+coin.symbol.slice(1).toLocaleLowerCase()}
            </div>
            
        </div>
    );
}

function TokenLogo({ symbol, coin, className }: { symbol: string; coin?: Coin; className?: string }) {
    const displaySymbol = symbol === "Eth" ? "ETH" : (coin?.symbol || symbol).toUpperCase();

    if (symbol === "Eth" || coin?.imageUrl) {
        const imageSrc = symbol === "Eth" ? eth_symbol.src : coin?.imageUrl;

        return (
            <div className={cn("flex items-center gap-2", className)}>
                <span className="text-xs font-semibold text-neutral-200">
                    {displaySymbol.length > 8 ? `${displaySymbol.slice(0, 8)}…` : displaySymbol}
                </span>
                <img
                    className="h-8 w-8 rounded-full object-cover border border-neutral-50"
                    src={imageSrc}
                    alt={displaySymbol}
                />
            </div>
        );
    }

    return (
        <span className={cn("rounded-md bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-200", className)}>
            {symbol.length > 8 ? `${symbol.slice(0, 8)}…` : symbol}
        </span>
    );
}