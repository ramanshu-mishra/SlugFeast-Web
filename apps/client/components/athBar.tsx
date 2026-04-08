"use client";
import {motion} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFetchCoinDisplayInfo } from "../hooks/useFetchCoinDisplayInfo";
import { memo } from "react";
import { useGetUSDPrice } from "../hooks/useGetUSDPrice";
import { globalCoinDataManager } from "../serviceClasses/globalCoinDataManaget";


const formatUSDCompact = (value: number): string => {
    if (!Number.isFinite(value)) return "$ 0";

    if (value >= 1e12) return `$ ${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$ ${(value / 1e9).toFixed(2)}b`;
    if (value >= 1e6) return `$ ${(value / 1e6).toFixed(2)}m`;
    if (value >= 1e3) return `$ ${(value / 1e3).toFixed(2)}k`;

    return `$ ${value.toFixed(2)}`;
};

export interface MessageResponse{
    bondingCurveProgress: Number,
    marketCap: string,
    currentPrice: string,
    athPrice: string,
    athProgress: string,

    coinAddress: `0x${string}`

    change_5min?: Number,
    change_15min?: Number,
    change_30min?: Number,
    change_1h?: Number,
    change_1D?: Number,
    change_5D?: Number,
    change_1M?: Number,
    change_1Y?: Number
}



export const ATHBar = memo(({coinAddress}: {coinAddress: `0x${string}`})=>{
    const {data, isLoading, error} = useFetchCoinDisplayInfo(coinAddress);
    const [clampedPercentage, setClampedPercentage] = useState(0);
    const [mc, setMc] = useState(4);
    const {usd, conversionError, conversionLoading} = useGetUSDPrice(mc);
    const [change_1h, setChange_1h] = useState<number|null>(null);
    const [change_5m, setChange_5m] = useState<number|null>(null);

     const client = useRef<globalCoinDataManager|null>(null);

    useEffect(()=>{
        const url = process.env.NEXT_PUBLIC_GLOBAL_WS_SERVER_URL as string;
        const manager = globalCoinDataManager.getGlobalCoinDataManager(url);
        client.current = manager;

        const unsubscribe = client.current.addListener(coinAddress as `0x${string}`,(m:MessageResponse)=>{
            const marketCap = (Number(m.marketCap)/10**18);
            const athProgress = Number(m.athProgress ?? 0);
            const _change_1h = Number(m.change_1h ?? 0);
            const _change_5m = Number(m.change_5min ?? 0);
            
            setMc(marketCap);
            setChange_1h(_change_1h);
            setChange_5m(_change_5m);
        });

        return ()=>unsubscribe();
    }, []);

    useEffect(()=>{
        if(data){
            const d = data as {data: MessageResponse};
            const marketCap = (Number(d.data.marketCap)/10**18);
            const athProgress = Number(d.data.athProgress ?? 0);
            setMc(marketCap);
            setChange_1h(Number(d.data.change_1h ?? 0));
            
            console.log("progress is : ",athProgress );
            setClampedPercentage(Number(athProgress.toFixed(4)));
            
        }
        
    }, [data, isLoading, error])



    return (
        <div className="flex gap-1 items-center">
            <div className="text-[0.8rem] text-neutral-400">MC</div>
            <motion.div className="shake text-[0.8rem]">{formatUSDCompact(usd?.usdValue ?? 0)}</motion.div>
            <ATHCurve clampedPercentage={clampedPercentage}></ATHCurve>
            <div className="w-20 flex justify-center text-[0.8rem]"> {change_5m ? change_5m : ""} </div>
        </div>
    )
})



const  ATHCurve = memo(({clampedPercentage }: {clampedPercentage: number})=>{

    useEffect(()=>{
        console.log(clampedPercentage);
    },[clampedPercentage])
    return (
        <div className="rounded-full bg-gray-700 w-full h-2 overflow-hidden">
            <motion.div
            style={clampedPercentage<=100 ? {
                backgroundColor : "var(--color-emerald-400)"
            } : 
            {
                backgroundColor : "var(--color-amber-400)"
            }
        }
            className= "rounded-full h-full"
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercentage}%`}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            >
            </motion.div>
        </div>
    )
})

