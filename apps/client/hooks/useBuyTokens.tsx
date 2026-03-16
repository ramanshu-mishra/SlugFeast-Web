"use client"
import { useWriteContract, usePublicClient } from "wagmi"
import abi from "@repo/abi/abi";
import { parseEther } from "viem";

export function useBuyTokens(){
    const { mutateAsync, data, error, isPending } = useWriteContract();
    const contractAdress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    const publicClient = usePublicClient();

    async function buyTokens({address, nonce, value}:{address: `0x${string}`, nonce: number, value: number}){
        const txHash = await mutateAsync({
            abi,
            address: contractAdress,
            functionName: "buy",
            args : [
                address,
                BigInt(nonce+1)
            ],
            value: parseEther(value.toString()),
            gas: 1_000_000n
        });


         // Wait for the transaction to be mined
        const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });
        return receipt; // receipt.status === "success" | "reverted"
    }

    
    return {buyTokens, buyHash: data, buyError: error, buyLoading: isPending};
}


