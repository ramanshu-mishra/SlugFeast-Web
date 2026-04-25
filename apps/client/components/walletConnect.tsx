"use client";

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRouter } from "next/navigation";
import { Toaster, useToast } from "./toaster";
import { copyTextToClipboard } from "../utility/copyTextToClipboard";
import { useConnection, useDisconnect } from "wagmi";
import { useGetWalletBalance } from "../hooks/useGetWalletBalance";
import { WeithToEth } from "../utility/weith_eth";
import { WalletDropDown } from "./walletDropDown";

function shortAddress(address: string, maxChar: number = 4) {
  if (!address) return null;
  return address.slice(2, maxChar + 2) + "..." + address.slice(-maxChar);
}

export function WalletConnect() {
  const { authenticated, login, logout, ready } = usePrivy();
  const { wallets } = useWallets();
  const wallet = wallets?.[0] ?? null;
  const { isConnected } = useConnection();
  const router = useRouter();
  const { toast, showToast } = useToast(1800);
  const { data: walletBalance } = useGetWalletBalance({
    address: wallet?.address as `0x${string}`,
  });
  const {disconnect} = useDisconnect();

  const MotionChevronUp = motion(ChevronUp);

  useEffect(() => {
    if (router && wallet) {
      router.prefetch(`profile/${wallet?.address}`);
    }
  }, [router, wallet]);

  const {open, toggle, setOpen, ref} = useClickOutside();
  if (!ready) return null;

  return (
    <div className="relative" ref={ref}>    
      <Toaster show={toast.show} message={toast.message} />
      <motion.div
        className="flex justify-center items-center bg-emerald-400 rounded-full font-bold text-neutral-950 cursor-pointer select-none"
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        whileHover={{
          scale: 1.03,
          transition: {
            duration: 0.1,
          },
        }}
      >
        {!isConnected && (
          <div
            className="w-full px-4 py-2 text-center"
            onClick={async () => {
            //   await logout();
              login();
            }}
          >
            Sign In
          </div>
        )}

        {isConnected && wallet && (
          <div
            
            className="w-full flex gap-1 justify-between px-2 py-2 relative "
            onClick={()=>{
               setOpen(e=>!e);
            }}
          >
            {WeithToEth(walletBalance?.value?.toString() ?? "")} ETH
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center"
            >
              <MotionChevronUp />
            </motion.span>
            
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {
                open && <motion.div
                 className="absolute z-50 top-11 right-0 "
                 initial={{
                    opacity: 0
                 }}
                 animate={{
                    opacity: 1,
                    transition:{
                        duration: 0.1
                    }
                 }}
                 >
                    <WalletDropDown></WalletDropDown>
                </motion.div>
            }
      </AnimatePresence>
      
    </div>
  );
}
