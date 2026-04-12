"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import { CoinRTCManager } from "../serviceClasses/coinRTCManager";
import {motion} from "motion/react";
import { MessageResponse_TokenData } from "@repo/messaging/interfaces";
import { useFetchCoinDisplayInfo } from "../hooks/useFetchCoinDisplayInfo";
import { ATHCurve } from "./athCurve";


const formatUSDCompact = (value: number): string => {
    if (!Number.isFinite(value)) return "$ 0";

    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;

    return `$ ${value.toFixed(2)}`;

};



export function RTCoinInfo({coinAddress}:{coinAddress: `0x${string}`}){
   


    return (
        <div className="w-full py-2 px-2  flex justify-between">
            <MarketCapInfo  coinAddress={coinAddress}></MarketCapInfo>
            <ATHBar  coinAddress={coinAddress}></ATHBar>
        </div>    
    )
}



const MarketCapInfo = memo(({coinAddress}:{coinAddress: `0x${string}`})=>{
    const manager = useMemo(() => CoinRTCManager.getCoinRTCManager(), []);
    const unsubscribeRef = useRef<null | (() => void)>(null);
    
    
    const [mc, setMc] = useState(0);
    const [change_24, setChange_24] = useState(0);
    const {data, isLoading, error} = useFetchCoinDisplayInfo(coinAddress);

    useEffect(()=>{
        const unsubscribe = manager.add_coin_data_listener( coinAddress ,(x:MessageResponse_TokenData)=>{
            setChange_24(Number(x.change_1D))
            setMc(Number(x.marketCap_usd))
        });

        unsubscribeRef.current = unsubscribe;
    }, [manager, coinAddress]);

    useEffect(() => {
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, []);

    return (
        <div className="flex flex-col gap-0">
            <div className="text-md text-neutral-500">Market Cap</div>
            <motion.div className="text-3xl font-bold">{isLoading ? "$0" :formatUSDCompact(Number(data?.data.marketCap_usd))}</motion.div>
            <motion.div style={{
                color: change_24 > 0? "var(--color-emerald-400)" : "var(--color-red-400)"
            }}>{change_24 > 0 ? "+" : "-"}{change_24.toFixed(2)}%</motion.div>
        </div>
    )
})


const ATHBar = memo(({ coinAddress}:{coinAddress: `0x${string}`})=>{
    const unsubscribeRef = useRef<null | (() => void)>(null);
    const [athProgress, setAthProgress] = useState(0);
    const [athCap, setATHCap] = useState(0);
     const {data, isLoading, error} = useFetchCoinDisplayInfo(coinAddress);
    
     useEffect(()=>{
        if(data){
            const _athCap = data.data.
        }
        
     }, [data]);
    return (

        <ATHCurve clampedPercentage={15} change_5m={5} className="basis-[30%]"></ATHCurve>
    )
})





