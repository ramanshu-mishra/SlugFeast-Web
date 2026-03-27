"use client"

import {  useGetHoldingPattern } from "../hooks/useGetHoldingPattern"
import { Spinner } from "./spinner";



export function TopHolders({coinAddress}:{coinAddress: `0x${string}`}){
    const {holdingData, holdingError, holdingLoading} = useGetHoldingPattern({coinAddress});

    return (
        <div className="w-full p-4 flex flex-col bg-neutral-900 rounded-xl">
            <div className="px-2 mb-4">Top Holders</div>
            <div>
                {holdingLoading && <div className="flex flex-col w-full p-2">Loading <Spinner></Spinner></div>}

                {!holdingLoading && holdingError && (
                    <div className="w-full p-2 text-sm text-red-400">Failed to load top holders.</div>
                )}

                {!holdingLoading && !holdingError && holdingData?.holding?.length > 0 && (
                    <div className="flex flex-col px-2 w-full gap-2">
                        {holdingData.holding.map((holder) => {
                            return (
                                <div key={holder.userAddress} className="w-full flex justify-between">
                                    <div className="text-sm">{holder.userAddress.toLocaleLowerCase() != "liquidity pool"? holder.userAddress.slice(0, 10) + "..." : "Liquidity Pool"}</div>
                                    <div className="text-md">{holder.percentageofHolding.toFixed(2)}%</div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}