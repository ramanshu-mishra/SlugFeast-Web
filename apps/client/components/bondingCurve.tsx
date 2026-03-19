"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react";
import useGetTokenReserves from "../hooks/useGetTokenReserves"
import { Spinner } from "./spinner";


function calculateProgress(tokenReserves: number){
    const total = 1*10**9*10**6
    const sold = total - tokenReserves;
    const percentage = Math.floor((sold/total)*100);
    return percentage;
}

export function BondingCurve({address}:{address: `0x${string}`}){
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    const tokenAddress = address;
    const {data, isLoading} = useGetTokenReserves({key: tokenAddress, address: contractAddress});
    
    const [percent, setPercent] = useState(0);

    useEffect(()=>{
        const tokenReserveResult = data?.[0];
        const tokenReserves = Number(tokenReserveResult?.result ?? 0);
        const per = calculateProgress(tokenReserves);
        setPercent(per);
    }, [data]);

    return (
        <div className="flex flex-col gap-2 h-fit bg-neutral-900 rounded-xl p-4">
            <div className="flex justify-between items-center">
                <div className=" tracking-tight  font-sm font-medium px-2">Bonding curve progress</div>
                <div>{isLoading && <Spinner size="sm" thickness="thin" ></Spinner>}
                    {!isLoading && `${percent}%`}
                </div>
            </div>
            <Curve percentage={percent}></Curve>
        </div>
    )
}

function Curve({percentage}:{percentage: number}){
    const clampedPercentage = Math.max(0, Math.min(100, Number.isFinite(percentage) ? percentage : 0));

    return (
        <div className="rounded-full bg-gray-700 w-full h-2 overflow-hidden">
            <motion.div
            className="bg-amber-400 rounded-full h-full"
            initial={{ width: 0 }}
            animate={{ width: `${clampedPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            >
            </motion.div>
        </div>
    )
}