"use client"

import { AnimatePresence, useAnimate } from "motion/react";
import {  useGetHoldingPattern } from "../hooks/useGetHoldingPattern"
import { Spinner } from "./spinner";
import {motion} from "motion/react";
import { memo, useEffect, useState } from "react";



export function TopHolders({coinAddress}:{coinAddress: `0x${string}`}){
    const {holdingData, holdingError, holdingLoading} = useGetHoldingPattern({coinAddress});
    const [scope, animate] = useAnimate();

    

   

    return (
        <div ref={scope} className="w-full p-4 flex flex-col bg-neutral-900 rounded-xl">
            <div className="px-2 mb-4">Top Holders</div>
            <div>
                {holdingLoading && <div className="flex flex-col w-full p-2">Loading <Spinner></Spinner></div>}

                {!holdingLoading && holdingError && (
                    <div className="w-full p-2 text-sm text-red-400">Failed to load top holders.</div>
                )}

                {!holdingLoading && !holdingError && holdingData?.holding?.length > 0 && (
                    <motion.div className="flex flex-col px-2 w-full gap-2">
                        <AnimatePresence>
                        {holdingData.holding.map((holder) => {
                            return (
                                    <UserHolding key={holder.userAddress} userAddress={holder.userAddress} percentageOfHolding={holder.percentageofHolding} ></UserHolding>
                            )
                        })}
                         </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    )
}



const UserHolding  = memo(({userAddress, percentageOfHolding}:{userAddress: string, percentageOfHolding: number})=>{
    const [scope,animate] = useAnimate();
    const [prevHolding, setPrevHolding] = useState(0);
        function shakeAnimation(color: string){
        animate(
            ".holding-value",
            {
                x: [0, -4, 4, -3, 3, 0],
                backgroundColor: [color, "var(--color-neutral-800)"]
            },
            {
                duration: 0.2,
                ease: "linear",
            }
        );
    }

    useEffect(()=>{
        if(percentageOfHolding > prevHolding){
            shakeAnimation("var(--color-emerald-500)");
        }
        else{
            shakeAnimation("var(--color-red-700)");
        }
        setPrevHolding(percentageOfHolding);
    }, [percentageOfHolding]);


    return (
        <motion.div ref={scope} layoutId={userAddress} key={userAddress} className="w-full flex justify-between">
                                    <div className="text-sm ">{userAddress.toLocaleLowerCase() != "liquidity pool"? userAddress.slice(0, 10) + "..." : "Liquidity Pool"}</div>
                                    <motion.div className="holding-value text-md px-2 rounded bg-neutral-800">{percentageOfHolding.toFixed(2)}%</motion.div>
                                </motion.div>
    )
})