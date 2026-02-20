"use client"

import { useState } from "react";
import {useReadContract} from "wagmi";
import {useBalance, useWriteContract} from "wagmi";
import { slugFeastAbi } from "../src/generated";
import { Abi } from "viem";

interface inputData{
    name: string|null,
    symbol :string|null,
    url: string|null
}

export default function Page(){

    const [ret,setRet] = useState<any>();
    const [data, setData] = useState<inputData|null>({
        name: null,
        symbol: null,
        url : null
    });
    const writeContract  = useWriteContract();
    
    const balance = useBalance({
        address : "0x482cBC5649B284ff67A05cDCa3362362e3d3fFc2"
    });



    function handleclick(){
        const ret = writeContract.mutate({
            abi: slugFeastAbi as Readonly<unknown[]>,
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "createToken",
            args: ["RamanshuCoin", 
                "RAM",
                "https://ramspace.fun"
            ]
        })
        console.log(ret);
        setRet(ret);
    }
    return (
        <div className="py-3 px-2 flex flex-col h-auto w-50 overflow-x-auto p-2 gap-2">
            <div className="flex gap-2">
                <span className="font-extrabold text-xl">BALANCE</span>
                <span>{(Number(balance.data?.value) ?? 0)/(Math.pow(10,18))}</span>
            </div>
            <input placeholder="tokenName" type="text"></input>
            <input placeholder="symbol" type="text"></input>
            <input placeholder="metadata-uri" type="text"></input>
            <button onClick={handleclick}>SUBMIT</button>
            {ret && <div>{ret}</div>}
        </div>
    )
}


