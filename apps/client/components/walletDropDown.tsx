"use client";

import { ArrowDownLeft, ArrowUpRight, Copy, Eye, History, RefreshCw, ShoppingBag } from "lucide-react";
import { useGetUSDPrice } from "../hooks/useGetUSDPrice";
import {motion} from "motion/react";
import { useGetWalletBalance } from "../hooks/useGetWalletBalance";
import { useConnection } from "wagmi";
import { WeithToEth } from "../utility/weith_eth";

export function WalletDropDown() {
    return (
        <div className="w-90 rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl hover:bg-neutral-900">
            <div className="p-4">
                <BalanceDisplay />
                <WalletActions />
            </div>
        </div>
    );
}

function BalanceDisplay() {

    const {usd, conversionError, conversionLoading} = useGetUSDPrice(0);
    const {address} = useConnection();
    const {data:walletBalance} = useGetWalletBalance({address : address as `0x${string}`});
    function toggleBalanceDisplay(){

    }
    return (
        <div className="w-full rounded-2xl bg-neutral-900/80">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        Your Balance
                    </p>
                    <div>
                        <p className="mt-2 text-3xl font-semibold text-neutral-100 cursor-pointer">${WeithToEth(walletBalance?.value.toString() ?? "")}</p>
                        <p className="mt-1 text-xs text-neutral-400"><motion.span
                            whileHover={{
                                color: "var(--color-neutral-50)",
                                cursor: "pointer",
                            }}
                        >0 SOL</motion.span> &nbsp;Available</p>
                    </div>
                  
                </div>
                <div className="flex gap-2 text-neutral-500">
                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 cursor-pointer"
                    >
                        <RefreshCw className="h-4 w-4 " />
                    </button>
                    <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 cursor-pointer"
                    >
                        <Eye className="h-4 w-4 " />
                    </button>
                </div>
            </div>

            <motion.div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 cursor-pointer"
                whileHover={{
                    backgroundColor: "var(--color-emerald-900)",
                    transition: {
                        duration: 0.2
                    }
                }}
            >
                HJWV...XqLH
                <Copy className="h-3.5 w-3.5" />
            </motion.div>
        </div>
    );
}

function WalletActions() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-3">
            <ActionCard
                icon={<ArrowDownLeft className="h-4 w-4" />}
                title="Deposit"
                subtitle="Crypto transfer"
            />
            <ActionCard
                icon={<ArrowUpRight className="h-4 w-4" />}
                title="Withdraw"
                subtitle="Send to wallet"
            />
            <ActionCard
                icon={<ShoppingBag className="h-4 w-4" />}
                title="Buy crypto"
                subtitle="Card / bank"
            />
            <ActionCard
                icon={<History className="h-4 w-4" />}
                title="History"
                subtitle="All activity"
            />
        </div>
    );
}

function ActionCard({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <motion.button
            whileHover={{
                y:-2,
                scale: 1.02,
                transition:{
                    duration:0.1
                }
            }}
            type="button"
            className="flex h-25 flex-col items-start justify-center gap-2 rounded-2xl border p-2 border-neutral-800 bg-neutral-950 px-4 text-left hover:border-neutral-700 cursor-pointer"
        >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                {icon}
            </span>
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-neutral-100">{title}</p>
                <p className="text-xs text-neutral-500">{subtitle}</p>
            </div>
        </motion.button>
    );
}