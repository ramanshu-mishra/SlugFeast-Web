"use client"

import { useReadContracts } from 'wagmi'
import { useAccount } from 'wagmi';
import abi from '@repo/abi/abi'


export default function useGetTokenReserves({key}: {key:string}){

    const {address, isConnected} = useAccount();
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    if(!isConnected)return;

     const result = useReadContracts({
        contracts: [
            {
    abi,
    address: contractAddress ,
    functionName: 'getTokenReserves',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    
  },
  {
    abi,
    address: contractAddress ,
    functionName: 'getVEthReserves',
    args: ['0x6b175474e89094c44da98b954eedeac495271d0f'],
    
  }
    ],
    account: address as `0x${string}`,
    query:{
        refetchInterval: 2000,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    }
     });

  return result;
}