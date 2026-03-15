"use client"
import { useReadContract } from "wagmi";
import abi from "@repo/abi/erc20Abi";
import { isAddress } from "viem";

export function useGetTokenBalance({
    tokenAddress,
    accountAddress,
}: {
    tokenAddress?: string;
    accountAddress?: string;
}) {
    const zeroAddress = "0x0000000000000000000000000000000000000000" as `0x${string}`;
    const validTokenAddress = tokenAddress && isAddress(tokenAddress) ? (tokenAddress as `0x${string}`) : zeroAddress;
    const validAccountAddress = accountAddress && isAddress(accountAddress) ? (accountAddress as `0x${string}`) : zeroAddress;
    const enabled = validTokenAddress !== zeroAddress && validAccountAddress !== zeroAddress;

    if(!enabled)return null;
    console.log("token address is, :" ,validTokenAddress);
    console.log("account address is : ", validAccountAddress);
    const { data, error, isLoading, refetch } = useReadContract({
        abi,
        address: validTokenAddress,
        functionName: "balanceOf",
        args: [validAccountAddress],
        query: {
            enabled,
            refetchInterval: 3000,
        },
    });
    console.log("token balance is : ", data);
    return { data, error, isLoading, refetch };
}