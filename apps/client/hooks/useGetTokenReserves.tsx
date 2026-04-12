"use client"

import { useReadContracts } from 'wagmi'
import abi from '@repo/abi/abi'
import { isAddress } from 'viem';


export default function useGetTokenReserves({key, address}: {key:`0x${string}`, address: `0x${string}`}){
    const zeroAddress = "0x0000000000000000000000000000000000000000" as `0x${string}`;
    const validKey = isAddress(key) ? key : zeroAddress;
    const validAccount = isAddress(address) ? address : zeroAddress;
    const envContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    const contractAddress = envContractAddress && isAddress(envContractAddress)
      ? (envContractAddress as `0x${string}`)
      : zeroAddress;
    const enabled = validKey !== zeroAddress && validAccount !== zeroAddress && contractAddress !== zeroAddress;


  

     const {data, error , isLoading} = useReadContracts({
        contracts: [
            {
    abi,
    address: contractAddress ,
    functionName: 'getTokenReserves',
              args: [validKey],
    
  },
  {
    abi,
    address: contractAddress ,
    functionName: 'getVEthReserves',
    args: [validKey],
    
  }
    ],
    account: validAccount,
    query:{
      enabled,
        // refetchInterval: 2000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchIntervalInBackground: true
    }
     });

     
    
  return {data,error,isLoading};
}