"use client"
import { useWriteContract, usePublicClient } from "wagmi"
import abi from "@repo/abi/abi";
import { parseEther } from "viem";

export function useBuyTokens({address, nonce, value}:{address: `0x${string}`, nonce: number, value: number}){
    const { mutateAsync, data, error, isPending } = useWriteContract();
    const contractAdress = process.env.NEXT_ENV_CONTRACT_ADDRESS as `0x${string}`;
    const publicClient = usePublicClient();

    async function buyTokens(){
        const txHash = await mutateAsync({
            abi,
            address: contractAdress,
            functionName: "buy",
            args : [
                address,
                nonce
            ],
            value: parseEther(value.toString())
        });


         // Wait for the transaction to be mined
        const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });
        return receipt; // receipt.status === "success" | "reverted"
    }

    
    return {buyTokens, buyHash: data, buyError: error, buyLoading: isPending};
}


