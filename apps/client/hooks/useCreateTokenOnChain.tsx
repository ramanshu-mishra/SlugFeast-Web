"use client"
import { useWriteContract, usePublicClient } from "wagmi";
import abi from "@repo/abi/abi";


interface ITokenParams{
    name : string,
    symbol : string,
    metadata_uri : string,
    id : string,
    nonce : number,
    signature: string,
    publicKey: `0x${string}`
}



export function useCreateTokenOnChain() {
    const { mutateAsync, data, error, isPending } = useWriteContract();
    const publicClient = usePublicClient();

    async function createTokenOnChain(tokenParams: ITokenParams) {
        const txHash = await mutateAsync({
            abi,
            address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
            functionName: "createToken",
            args: [
                tokenParams.name,
                tokenParams.symbol,
                tokenParams.metadata_uri,
                tokenParams.id,
                tokenParams.nonce + 1,
                tokenParams.signature
            ]
        });

        // Wait for the transaction to be mined
        const receipt = await publicClient!.waitForTransactionReceipt({ hash: txHash });
        console.log("reciept is ", receipt);
        return receipt; // receipt.status === "success" | "reverted"

    }

    return { createTokenOnChain, coinOnChain: data, coinOnChainError: error, coinOnChainLoading: isPending };
}