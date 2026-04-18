"use client"

import { motion } from "motion/react";
import { RefObject, useState } from "react";
import { useConnection } from "wagmi";
import { copyTextToClipboard } from "../utility/copyTextToClipboard";
import { WalletConnect } from "../components/walletConnect";
import { Copy } from "lucide-react";
import { Toaster, useToast } from "../components/toaster";
import { EditProfile } from "../components/editProfile";
import { cn } from "../utility/cn";
import { useClickOutside } from "../hooks/useClickOutside";
type ProfileTab = "balances" | "coins" | "creatorRewards";

function ProfileTabs({
    activeTab,
    onChange,
}: {
    activeTab: ProfileTab;
    onChange: (tab: ProfileTab) => void;
}) {
    return (
        <div className="flex gap-10 border-b border-neutral-800 pb-2">
            <motion.button
                type="button"
                onClick={() => onChange("balances")}
                className="relative px-4 py-2 text-white"
            >
                Balances
                {activeTab === "balances" && (
                    <motion.div
                        layoutId="profile-tab-indicator"
                        className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-400"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                )}
            </motion.button>

            <motion.button
                type="button"
                onClick={() => onChange("coins")}
                className="relative px-4 py-2 text-white"
            >
                Coins
                {activeTab === "coins" && (
                    <motion.div
                        layoutId="profile-tab-indicator"
                        className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-400"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                )}
            </motion.button>

            <motion.button
                type="button"
                onClick={() => onChange("creatorRewards")}
                className="relative px-4 py-2 text-white"
            >
                Creator rewards
                {activeTab === "creatorRewards" && (
                    <motion.div
                        layoutId="profile-tab-indicator"
                        className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-emerald-400"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                )}
            </motion.button>
        </div>
    );
}






export function Profile(){
   
    const { close, ref, open, setOpen } = useClickOutside({
        onOutsideClick : ()=>close(),
        initialOpen: false,
    });

    return (
        <div className="h-full w-full flex gap-2 px-4 py-6">
            <ProfileSection onEditClick={()=>setOpen(true)}></ProfileSection>
            
            {open && (
                <motion.div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[5px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={close}
                />
            )}
            
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="pointer-events-auto" ref={ref}>
                        <EditProfile className="w-96" />
                    </div>
                </motion.div>
            )}
        </div>
    )
}


export function ProfileSection({className, onEditClick}:{className?: string, onEditClick: ()=>void}){

    const {isConnected, address} = useConnection();
    const [activeTab, setActiveTab] = useState<ProfileTab>("balances");
    const { toast, showToast } = useToast(1800);

    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

    return (
        <div className={cn("h-full w-full flex flex-col gap-6  text-neutral-100", className)}>
            <Toaster show={toast.show} message={toast.message} />
            <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="h-20 w-20 rounded-full bg-linear-to-br from-emerald-400 to-cyan-500 shrink-0" />
                    <div className="flex flex-col gap-2 ">
                        <div className="text-xl font-semibold">User Profile</div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {isConnected ? (
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const copied = await copyTextToClipboard(address ?? "");
                                        showToast(copied ? "Address copied" : "Failed to copy address");
                                    }}
                                    className="text-sm rounded-md border border-neutral-700 px-3 py-1 hover:border-neutral-500 transition-colors duration-100 flex gap-2 items-center"
                                    title={address}
                                >
                                    
                                    {shortAddress}
                                    <Copy height={15}></Copy>
                                </button>
                            ) : (
                                <WalletConnect />
                            )}
                        </div>
                    </div>
                    </div>
                    
                    <motion.div
                        className="px-4 py-2 bg-neutral-700 rounded-lg select-none"
                        whileHover={{
                            backgroundColor: "var(--color-neutral-800)",
                            cursor: "pointer",
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{
                            scale: 0.99,
                            y: 1
                        }}
                        onClick={onEditClick}
                    >
                        Edit Profile
                    </motion.div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-center">
                        <p className="text-xs text-neutral-400">Followers</p>
                        <p className="text-base font-semibold text-neutral-100">0</p>
                    </div>
                    <div className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-center">
                        <p className="text-xs text-neutral-400">Following</p>
                        <p className="text-base font-semibold text-neutral-100">0</p>
                    </div>
                    <div className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-center">
                        <p className="text-xs text-neutral-400">Coins created</p>
                        <p className="text-base font-semibold text-neutral-100">0</p>
                    </div>
                    <div className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-center">
                        <p className="text-xs text-neutral-400">Aura</p>
                        <p className="text-base font-semibold text-neutral-100">0</p>
                    </div>
                </div>

                <div className="mt-5 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
                    <p className="text-sm text-neutral-400 mb-1">Bio</p>
                    <p className="text-sm text-neutral-200">
                        Builder on SlugFeast. Exploring meme coin launches, onchain communities, and creator-first token experiments.
                    </p>
                </div>
            </div>

            <div className="w-full bg-neutral-900 py-4 px-3 flex flex-col rounded-xl border border-neutral-800 gap-6">
                <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

                <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-300 min-h-32">
                    {activeTab === "balances" ? (
                        <p>No balances to display yet.</p>
                    ) : null}
                    {activeTab === "coins" ? (
                        <p>No created coins to display yet.</p>
                    ) : null}
                    {activeTab === "creatorRewards" ? (
                        <p>No creator rewards available yet.</p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}