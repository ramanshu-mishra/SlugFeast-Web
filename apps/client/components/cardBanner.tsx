import Image from "next/image";
import logo from "../public/logo1.png";
import {motion} from "motion/react";
import {  Copy, Share2, Star } from "lucide-react";

import { Coin } from "../interfaces/coinInterface";


function shortText(value?: string | null, left: number = 4, right: number = 4) {
    if (!value) return "";
    if (value.length <= left + right) return value;
    return `${value.slice(0, left)}...${value.slice(-right)}`;
}

export function CardBanner({ coin }: { coin?: Coin | null }) {
    const creatorName = coin?.user?.name ?? shortText(coin?.user?.publicKey, 6, 4) ?? "Unknown";
    const pairLabel = coin?.symbol ? `${coin.symbol.toUpperCase()}` : "UNKNOWN";
    const tokenLabel = coin?.tokenName ?? "Unknown Token";
    const tokenAddress = coin?.address ?? "";
    const shortAddress = shortText(tokenAddress, 4, 4) || "No Address";
    const creatorInitial = creatorName?.charAt(0)?.toUpperCase() || "?";

    return (
        <section className="w-full px-6 ">
            <div className=" flex w-full items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-4 lg:px-5">
                <div className="flex min-w-0 items-center gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-emerald-400">
                        {coin?.imageUrl ? (
                            <img
                                src={coin.imageUrl}
                                alt={tokenLabel}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <Image
                                src={logo}
                                alt={tokenLabel}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate text-xl tracking-wide font-semibold leading-tight text-neutral-100">{tokenLabel}</h2>
                        <p className="mt-1 text-md font-medium text-neutral-200">{pairLabel}</p>

                        <div className="mt-1 flex items-center gap-2 text-sm text-neutral-400">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[10px] font-semibold text-white">
                                {creatorInitial}
                            </div>
                            <span className="truncate">{creatorName}</span>
                            <span>·</span>
                            <span className="truncate">{shortAddress}</span>
                        </div>
                    </div>
                </div>

                <div className="ml-4 flex shrink-0 items-center gap-2">
                    <motion.button
                        whileHover={{
                            scale: 1.05
                        }}
                        transition={{
                            duration: 0.1
                        }}
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:opacity-90 cursor-pointer"
                    >
                        <Share2 className="h-4 w-4" />
                        Share
                    </motion.button>

                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-3 text-sm font-semibold text-neutral-100 transition hover:bg-neutral-700"
                    >
                        <Copy className="h-4 w-4" />
                        {shortAddress}
                    </button>

                    <button
                        type="button"
                        aria-label="Favorite"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 transition hover:text-white"
                    >
                        <Star className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
