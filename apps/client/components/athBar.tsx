"use client";
import {motion, useAnimate} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useFetchCoinDisplayInfo } from "../hooks/useFetchCoinDisplayInfo";
import { memo } from "react";
import { useGetUSDPrice } from "../hooks/useGetUSDPrice";
import { globalCoinDataManager } from "../serviceClasses/globalCoinDataManaget";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ATHCurve } from "./athCurve";


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
    athCap: string,
    athCap_usd: string,
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
    const [scope, animate] = useAnimate();

     const client = useRef<globalCoinDataManager|null>(null);

    useEffect(()=>{
        const url = process.env.NEXT_PUBLIC_GLOBAL_WS_SERVER_URL as string;
        const manager = globalCoinDataManager.getGlobalCoinDataManager();
        client.current = manager;

        const unsubscribe = client.current.addListener(coinAddress as `0x${string}`,(m:MessageResponse)=>{
            const marketCap = (Number(m.marketCap)/10**18);
            const athProgress = Number(m.athProgress ?? 0);
            const _change_1h = Number(m.change_1h ?? 0);
            const _change_5m = Number(m.change_5min ?? 0);
            
            setMc(marketCap);
            setChange_1h(_change_1h);
            setChange_5m(_change_5m);
            setClampedPercentage(Number(athProgress.toFixed(4)));
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
            
           
            setClampedPercentage(Number(athProgress.toFixed(4)));
            
        }
        
    }, [data, isLoading, error]);


    function shakeAnimation(){
        animate(
            "#marketCap",
            {
                x: [0, -4, 4, -3, 3, 0],
                backgroundColor: ["var(--color-neutral-600)", "rgba(0, 0, 0, 0)"]
            },
            {
                duration: 0.2,
                ease: "linear",
            }
        );
    }

    useEffect(()=>{
        shakeAnimation();
    }, [usd?.usdValue])



    return (
        <div ref={scope} className="flex gap-1 items-center">
            <motion.div  className="text-[0.8rem] text-neutral-400 ">MC</motion.div>
            <motion.div  id="marketCap" className=" text-[0.8rem] " style={{
                backgroundColor: "rgba(0, 0, 0, 0)"
            }}>{formatUSDCompact(usd?.usdValue ?? 0)}</motion.div>
            <ATHCurve clampedPercentage={clampedPercentage} change_5m={Number(change_5m? change_5m.toFixed(2) : 0)}></ATHCurve>
            <motion.div className="w-20 flex justify-center items-center tracking-tight text-[0.8rem]"
                style={change_5m  && change_5m > 0 ? {
                    color: "var(--color-emerald-300)"
                }:
            {
                color : "var(--color-red-400)"
            }}
            > 
                
                {change_5m  && change_5m > 0 ? <ArrowUp className="h-4"></ArrowUp> : <ArrowDown className="h-4"></ArrowDown>} {change_5m ? change_5m.toFixed(2) : "0"}% </motion.div>
        </div>
    )
})








