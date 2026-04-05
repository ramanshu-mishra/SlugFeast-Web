"use client";
import {motion} from "motion/react";
import { useEffect, useState } from "react";
import { useFetchCoinDisplayInfo } from "../hooks/useFetchCoinDisplayInfo";
import { memo } from "react";
import { useGetUSDPrice } from "../hooks/useGetUSDPrice";

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



export const ATHBar = memo((coinAddress: `0x${string}`)=>{

    const {data, isLoading, error} = useFetchCoinDisplayInfo(coinAddress);
    const [clampedPercentage, setClampedPercentage] = useState(0);
    const [mc, setMc] = useState(4);
    const {usd, conversionError, conversionLoading} = useGetUSDPrice(mc);

    useEffect(()=>{
        if(!data)
        if(data){
            const d = data as {data: MessageResponse};
            
        }
        
    }, [data, isLoading, error])

    return (
        <div className="flex gap-1">
            <div></div>
            <ATHCurve clampedPercentage={clampedPercentage.toFixed(2)}></ATHCurve>
            <div></div>
        </div>
    )
})



const  ATHCurve = memo(({clampedPercentage}: {clampedPercentage: string})=>{
    return (
        <div className="rounded-full bg-gray-700 w-full h-2 overflow-hidden">
            <motion.div
            className="bg-amber-400 rounded-full h-full"
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercentage}%`}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            >
            </motion.div>
        </div>
    )
})