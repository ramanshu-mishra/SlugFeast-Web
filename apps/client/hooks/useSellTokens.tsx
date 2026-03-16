"use client"
import { useWriteContract, usePublicClient } from "wagmi"
import abi from "@repo/abi/abi"

export function useSellTokens({address, amount, nonce}:{address: `0x${string}`, amount: number, nonce:number}){
    const {mutateAsync, data, error, isPending} = useWriteContract();
    const publicClient = usePublicClient();
    const contractAdress = process.env.NEXT_ENV_CONTRACT_ADDRESS as `0x${string}`;

    async function sellTokens(){
        const txHash = await mutateAsync({
            abi,
            address: contractAdress,
            functionName: "sell",
            args: [
                address,
                amount,
                nonce
            ]
        });

        // Wait for the transaction to be mined
        const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });
        return receipt; // receipt.status === "success" | "reverted"
    }

    return {sellTokens, sellHash:data, sellError:error, sellLoading:isPending};
}