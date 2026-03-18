"use client"
import { useWriteContract, usePublicClient } from "wagmi"
import abi from "@repo/abi/abi"
import tokenAbi from "@repo/abi/erc20Abi"

export function useSellTokens(){
    const {mutateAsync, data, error, isPending} = useWriteContract();
    const publicClient = usePublicClient();
    const contractAdress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    

    async function sellTokens({address, amount, nonce}:{address: `0x${string}`, amount: bigint, nonce:number}){

        //approve the slugDex contract to spend money on users behalf on the SlugToken contract.
        const allowanceHash = await mutateAsync({
            abi:tokenAbi,
            address: address,
            functionName: "approve",
            args: [
                contractAdress,
                amount
            ],
             gas: 1_000_000n
        });

        if(!allowanceHash)return;

        // await publicClient!.waitForTransactionReceipt({ hash: allowanceHash });

        const txHash = await mutateAsync({
            abi,
            address: contractAdress,
            functionName: "sell",
            args: [
                address,
                amount,
                BigInt(nonce+1)
            ],
            gas: 1_000_000n
        });

        if(!txHash)return;

        // Wait for the transaction to be mined
        const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });
        return receipt; // receipt.status === "success" | "reverted"
    }

    return {sellTokens, sellHash:data, sellError:error, sellLoading:isPending};
}