"use client"
import { useWriteContract } from "wagmi"
import abi from "@repo/abi/abi";

export function useBuyTokens({address, nonce, value}:{address: `0x${string}`, nonce: number, value: number}){
    const writeContract= useWriteContract();
    const contractAdress = process.env.NEXT_ENV_CONTRACT_ADDRESS as `0x${string}`;

    async function buyTokens(){
        writeContract.mutate({
            abi,
            address: contractAdress,
            functionName: "buy",
            args : [
                address,
                nonce
            ],
            value: BigInt(value)
        })
    }

    return {buyTokens};
}