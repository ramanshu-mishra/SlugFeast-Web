"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { log } from "console";
import { useMemo } from "react";


export function useGetWalletInfo(){
    const {authenticated, login, logout, ready} = usePrivy();
    const {wallets} = useWallets();
    const wallet = useMemo(()=>{
        if(wallets){
            return wallets[0];
        }
        return null;
    }, [wallets]);
    const address = useMemo(()=>{
        if(wallet){
            return wallet.address;
        }
        return null;
    }, [wallet]);

    async function Logout(){
        await logout();
        wallet?.disconnect();
    }
    const isConnected = useMemo(()=>{
        if(wallet){
            return wallet.isConnected;
        }
        return null;
    }, [wallet]);
    return {
        authenticated, login, logout:Logout, wallet, address,ready, isConnected
    }

    
}