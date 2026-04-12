"use client";
import {motion} from "motion/react";
import { memo, useEffect, useState } from "react";
import { cn } from "../utility/cn";

export const  ATHCurve = memo(({clampedPercentage, change_5m , className}: {clampedPercentage: number, change_5m : number, className?: string})=>{
    
    const [pump,setPump] = useState(false);
   
    useEffect(()=>{
        const pmp = clampedPercentage >= 100 && change_5m > 0;
        
        setPump(pmp);
    }, [clampedPercentage, change_5m])


    return (
        <div className= {cn("rounded-full bg-gray-700 w-full h-2 overflow-hidden  border border-neutral-700", className)} >
            <motion.div
            style={pump ? {
                backgroundColor : "var(--color-amber-400)"
            } : 
            {
                backgroundColor : "var(--color-emerald-400)"
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
