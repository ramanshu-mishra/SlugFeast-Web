"use client"
import { useState } from "react";
import { motion } from "motion/react";
import { Comments } from "./comments";

export function Chat_n_Trade({coinAddress}:{coinAddress: `0x${string}`}){
    const [option, setOption] = useState(0);

    return (
        <div className="w-full px-6 pb-2">
            <div className="w-full bg-neutral-900 py-4 px-3 flex flex-col rounded-xl border border-neutral-800 gap-6">
                 <div className="">
                <div className="flex gap-10">
                    <motion.button
                        type="button"
                        onClick={() => setOption(0)}
                        className="relative px-4 py-2 text-white"
                    >
                        Comments
                        {option === 0 && (
                            <motion.div
                                layoutId="chat-trade-tab-indicator"
                                className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-400"
                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            />
                        )}
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={() => setOption(1)}
                        className="relative px-4 py-2 text-white"
                    >
                        Trades
                        {option === 1 && (
                            <motion.div
                                layoutId="chat-trade-tab-indicator"
                                className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-400"
                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            />
                        )}
                    </motion.button>
                </div>
            </div>
            <div className="w-full">
                {
                    option == 0 && 
                    <Comments coinAddress={coinAddress}></Comments>
                }
                
            </div>
            </div>
           
        </div>
    )
}