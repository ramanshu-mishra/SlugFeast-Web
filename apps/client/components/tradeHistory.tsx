"use client"

import { TradeEvent } from "@repo/messaging/interfaces";
import { useEffect, useMemo, useRef, useState } from "react"
import { CoinRTCManager } from "../serviceClasses/coinRTCManager";
import { Timer } from "lucide-react";

export function TradeHistory({coinAddress}: {coinAddress: `0x${string}`}){
    const manager = useMemo(() => CoinRTCManager.getCoinRTCManager(), []);
    const [trades, setTrades] = useState<TradeEvent[]>([]);
    useEffect(()=>{
            const unsubscribe = manager.add_trade_listener(coinAddress, (trade: TradeEvent)=>{
                setTrades((existingTrades) => {
                    const tradeIndex = existingTrades.findIndex(
                        (existingTrade) => existingTrade.data.txnHash === trade.data.txnHash,
                    );

                    if (tradeIndex === -1) {
                        return [trade, ...existingTrades];
                    }

                    const nextTrades = [...existingTrades];
                    nextTrades[tradeIndex] = trade;
                    return nextTrades;
                });
            });

            return () => {
                unsubscribe();
            };
        }, [manager, coinAddress]);


    return (
        <div className="">
               <div className="flex justify-between">
                <div>Account</div>
                <div>Type</div>
                <div>Amount</div>
                <div>Amonut</div>
                <div className="flex gap-1 items-center">Time <Timer className="h-5 -translate-y-0.5"></Timer></div>
                <div>Txn</div>
               </div>
        </div>
    )
}