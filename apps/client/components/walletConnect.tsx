"use client";

import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {motion} from "motion/react";
import {memo} from "react";
import {ChevronDown, User2, Wallet, Copy, LogOut} from "lucide-react";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRouter } from "next/navigation";
import { Toaster, useToast } from "./toaster";
import { copyTextToClipboard } from "../utility/copyTextToClipboard";
import { useConnection } from "wagmi";
import { useGetWalletInfo } from "../hooks/useGetWalletInfo";



function shortAddress(address: string, maxChar: number = 4){
    if(!address)return null;
    return address.slice(2, maxChar+2) + "..." + address.slice(-maxChar);
}

export function WalletConnect(){
    
    const {wallet, ready, authenticated , isConnected, login, logout } = useGetWalletInfo();
    const router = useRouter();
    const { toast, showToast } = useToast(1800);
    
   

    useEffect(()=>{
        if(router && wallet){
            router.prefetch(`profile/${wallet?.address}`)
        }
    }, [router, wallet]);

    const {connector} = useConnection();
    const [open, setOpen] = useState(false);
     if(!ready)return null;
    
        return (
            <>
            <Toaster show={toast.show} message={toast.message} />
            <motion.div className="flex justify-center items-center w-45 py-2 bg-emerald-400 rounded-full font-bold text-neutral-950 cursor-pointer"
                whileTap={{
                    scale: 0.98,
                    transition: {duration: 0.3}
                }}

                whileHover={{
                    scale: 1.02,
                    transition: {
                        duration: 0.3
                    }
                }}

            >

                {
                    (!authenticated ) && <div onClick={async()=>{
                        login();
                    }}>
                        Sign In
                    </div>
                }
                {   

                    (authenticated && wallet) && (
                        <WalletDropDown
                            wallet={wallet}
                            onProfile={() => router.push(`/profile/${wallet.address}`)}
                            onCopyAddress={async () => {
                                const address = wallet.address;
                                if (!address) {
                                    showToast("No address to copy");
                                    return;
                                }

                                const copied = await copyTextToClipboard(address);
                                showToast(copied ? "Address copied" : "Failed to copy address");
                            }}
                            onSignOut={async () => {
                                await logout();
                            }}
                        />
                    )
                }
            </motion.div>
            </>
        )
    
}


const WalletModal = memo(()=>{
    return (
        <div>

        </div>
    )
})



function WalletDropDown({
    wallet,
    onProfile,
    onCopyAddress,
    onSignOut,
}: {
    wallet: ConnectedWallet | null | undefined;
    onProfile: () => void;
    onCopyAddress: () => Promise<void> | void;
    onSignOut: () => Promise<void> | void;
}){

    const {ref, open, setOpen, close, toggle} = useClickOutside();
    const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 0 });
    
    const menuVariants = {
        open: {
            height: "auto",
            opacity: 1
        },
        closed: {
            height: 0,
            opacity: 0
        }
    }

    const childVariants = {
        open: {
            opacity: 1,
            y: 0
        },
        closed: {
            opacity: 0,
            y: -10
        }
    }

    const parentVariants = {
        open: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.025
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: -1
            }
        }
    }

    useEffect(() => {
        if (!open || !ref.current) {
            return;
        }

        const rect = ref.current.getBoundingClientRect();
        setMenuStyle({
            top: rect.bottom + 10,
            left: rect.left+15,
            width: rect.width-20,
        });
    }, [open, ref]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePosition = () => {
            if (!ref.current) {
                return;
            }

            const rect = ref.current.getBoundingClientRect();
            setMenuStyle({
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width,
            });
        };

        window.addEventListener("resize", handlePosition);
        window.addEventListener("scroll", handlePosition, true);

        return () => {
            window.removeEventListener("resize", handlePosition);
            window.removeEventListener("scroll", handlePosition, true);
        };
    }, [open, ref]);

    return (
        <motion.div ref={ref} className="flex gap-2 items-center h-full w-full  justify-center"
            variants={menuVariants}
            onClick={()=>{
                toggle()
            }}
        >
            {!wallet && "Kya re laude"}
            {
                wallet && shortAddress(wallet?.address as `0x${string}`)
            }   
        <ChevronDown></ChevronDown>
        {typeof document !== "undefined" && createPortal(
            <motion.div
                className="fixed z-[9999] overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-lg "
                style={{
                    top: menuStyle.top,
                    left: menuStyle.left,
                    width: menuStyle.width || 176,
                }}
                variants={menuVariants}
                initial="closed"
                animate={open ? "open": "closed"}
                onClick={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
            >
                <motion.div className="flex flex-col py-1"
                    variants={parentVariants}
                >
                    {Object.entries(dropDownMenu).map(([label, item])=>{
                        const handleClick = async () => {
                            if (label === "Profile") {
                                onProfile();
                            }

                            if (label === "CopyAddress") {
                                await onCopyAddress();
                            }

                            if (label === "Sign Out") {
                                await onSignOut();
                            }

                            close();
                        };

                        return (
                            <motion.button
                                key={label}
                                type="button"
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-neutral-900 cursor-pointer font-bold rounded-lg"
                                variants={childVariants}
                                onClick={handleClick}
                            >
                                <span className="flex h-4 w-4 items-center justify-center" >
                                    {item.icon}
                                </span>
                                <span>{label}</span>
                            </motion.button>
                        )
                    })}
                </motion.div>
            </motion.div>,
            document.body
        )}
           
        </motion.div>
    )
}


const dropDownMenu = {
    "Profile": {
        icon: <User2 strokeWidth={3}></User2>,  
    },
    "Wallet" : {
        icon: <Wallet strokeWidth={3}></Wallet>,
     
    },
    "CopyAddress" : {
        icon: <Copy strokeWidth={3}></Copy>,
       
    },
    "Sign Out" : {
        icon: <LogOut strokeWidth={3}></LogOut>,
      
    }

}