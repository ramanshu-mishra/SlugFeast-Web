"use client"
import { useWriteContract } from "wagmi"
import abi from "@repo/abi/abi"

export function useSellTokens({address, amount, nonce}:{address: `0x${string}`, amount: number, nonce:number}){
    const writeContract = useWriteContract();
    const contractAdress = process.env.NEXT_ENV_CONTRACT_ADDRESS as `0x${string}`;

    function sellTokens(){
        writeContract.mutate({
            abi,
            address: contractAdress,
            functionName: "sell",
            args: [
                address,
                amount,
                nonce
            ]
        });
    }

    return {sellTokens};
}