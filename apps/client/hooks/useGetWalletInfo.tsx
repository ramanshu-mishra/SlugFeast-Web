"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useCallback, useMemo, useState } from "react";
import { useConnection, useDisconnect } from "wagmi";


export function useGetWalletInfo() {
    const  [loggingOut, setLogginOut] = useState(false);
    const { authenticated, login, logout, ready } = usePrivy();
    const { wallets } = useWallets();
    const {disconnect} = useDisconnect();
    const {address, isConnected} = useConnection();
    const _isConnected = useMemo(() => Boolean(isConnected && authenticated), [isConnected, authenticated]);

    const Logout = useCallback(async () => {
        setLogginOut(true);
        try {
            disconnect();
        } catch {
            // Ignore disconnect errors and still complete logout.
        } finally {
            await logout();
            setLogginOut(false);
        }
    }, [logout]);

    return {
        authenticated,
        login,
        logout: Logout,
        address,
        ready,
        isConnected:_isConnected,
        loggingOut
    };
}