import {useReadContract} from "wagmi";
import abi from "@repo/abi/abi";

export function useGetNonce(account: `0x${string}` | undefined){
    const {data, isPending, error, refetch} = useReadContract({
        abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "getNonce",
        account: account,
        query:{
            enabled: false
        }
    });

    return {
        data,
         isPending,
         error,
         refetch
    }

}