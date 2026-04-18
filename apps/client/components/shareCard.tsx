"use client";
import {motion} from "motion/react"
import { useEffect, useState } from "react";
import cardBg from "../public/sharedCard.png";
import XIcon from "../public/twitter.png";
import Image from "next/image";
import { Copy, Download } from "lucide-react";
import { copyTextToClipboard } from "../utility/copyTextToClipboard";
import { downloadBlob } from "../utility/downloadBlob";
import { generateDisplayCardPng } from "../utility/generateDisplayCardPng";





export function ShareCard({coinAddress, coinSymbol, coinName}: {coinAddress: `0x${string}`, coinSymbol: string, coinName: string}){
    const [link, setLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    useEffect(()=>{
        const clientAddress = process.env.NEXT_PUBLIC_CLIENT_ADDRESS || window.location.origin;
        setLink(`${clientAddress}/coin/${coinAddress}`);
    }, [coinAddress]);

    const handleCopyLink = async () => {
        if (!link) return;
        const isCopied = await copyTextToClipboard(link);
        if (isCopied) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } else {
            setCopied(false);
        }
    };

    const handleShareOnX = () => {
        if (!link) return;
        const tweetText = `Check out $${coinSymbol.toUpperCase()} (${coinName}) on Slugfeast ${link}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "_blank", "noopener,noreferrer");
    };

    const handleDownloadImage = async () => {
        try {
            const cardBlob = await generateDisplayCardPng(coinSymbol, coinName);
            const filename = `${coinSymbol.toLowerCase()}-slugfeast-share.png`;
            downloadBlob(cardBlob, filename);
            setDownloaded(true);
            setTimeout(() => setDownloaded(false), 1800);
        } catch {
            setDownloaded(false);
        }
    };

    return (
        <div className="w-100 flex flex-col gap-2">
            <div className="text-neutral-50">Share Coin </div>
            <div className="text-neutral-400">Invite fellow memers to Slugfeast </div>  
            <DisplayCard coinSymbol={coinSymbol} coinName={coinName}></DisplayCard>

            <div className="flex flex-col gap-3 py-2 px-3 items-center my-2">
                <motion.button
                    type="button"
                    onClick={handleCopyLink}
                    disabled={!link}
                    className="flex cursor-pointer gap-2 items-center bg-emerald-400 w-full justify-center rounded-lg py-1 text-neutral-950 font-bold disabled:cursor-not-allowed disabled:opacity-60"
                    whileHover={{scale: 1.01}}
                    whileTap={{scale: 0.99}}
                >
                    
                    <Copy className="h-5"></Copy>
                    {copied ? "Copied!" : "Copy Link"}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={handleDownloadImage}
                    className="flex cursor-pointer gap-2 items-center bg-neutral-800 w-full justify-center rounded-lg py-1 text-neutral-100 font-bold"
                    whileHover={{scale: 1.01}}
                    whileTap={{scale: 0.99}}
                >
                    <Download className="h-5 w-5" />
                    {downloaded ? "Downloaded!" : "Download"}
                </motion.button>
            <motion.button
                    type="button"
                    onClick={handleShareOnX}
                    disabled={!link}
                    className="flex cursor-pointer gap-2 justify-center rounded-lg py-1 w-full bg-neutral-700 font-bold disabled:cursor-not-allowed disabled:opacity-60"
                    whileHover={{scale: 1.01}}
                    whileTap={{scale: 0.99}}
            > 
                <Image src={XIcon} alt="XIcon" className="aspect-auto h-5 w-5 "></Image>
                Share on X
            </motion.button>
            </div>
            
        </div>
    )
}




function DisplayCard({coinSymbol, coinName}: {coinSymbol: string, coinName: string}){
    return (
        <div className="relative overflow-hidden rounded-lg border border-orange-950/40">
    {/* The Banner Background */}
    <img src={cardBg.src} className="rounded-lg object-cover" alt="Slugfeast Background" />
    
    {/* 
        CENTRAL GLOW/SHADOW BLUR: 
        A radial gradient that darkens the center slightly to provide contrast 
        for the text without hiding the snail patterns.
    */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.6)_0%,_transparent_70%)] opacity-80" />

    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {/* 
            COIN SYMBOL: 
            Added a triple-layer shadow: 1. Black outline, 2. Deep red blur, 3. Outer fire glow.
        */}
        <div className="text-3xl font-black tracking-tighter uppercase 
            bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 
            bg-clip-text text-transparent 
            filter drop-shadow-[0_2px_1px_rgba(0,0,0,1)] 
            drop-shadow-[0_0_12px_rgba(153,27,27,0.8)]
            drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]">
            ${coinSymbol.toUpperCase()}
        </div>

        {/* 
            COIN NAME: 
            Placed inside a semi-transparent 'glass' pill to ensure it's readable 
            even over the most complex parts of the snail pattern.
        */}
        <div className="mt-2 px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-sm 
            border border-orange-500/20 max-w-[90%]">
            <div className="truncate text-[10px] font-bold uppercase tracking-[0.2em]
                text-orange-100 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                {coinName}
            </div>
        </div>
    </div>
    <div className="absolute bottom-6 left-0 w-full flex justify-center px-4">
    <div className="relative group">
        {/* THE "SHADOW BLUR" BEHIND THE TEXT */}
        <div className="absolute inset-0 bg-black/60 blur-md rounded-full -z-10 scale-125" />
        
        {/* THE STYLED TEXT */}
        <span className="
            px-4 py-1 
            text-[10px] font-black uppercase tracking-[0.3em] 
            
            /* COLOR: Molten Orange-Red */
            text-orange-200
            
            /* GLOW & EFFECTS: Makes it look 'lit' */
            drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]
            drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]
            
            /* BORDERS: Cinematic aesthetic lines */
            border-y border-orange-100/30
            
            /* SLIGHT SKEW: Gives it a 'meme/streetwear' tilt */
            -skew-x-6
        ">
            Lets start the feast
        </span>
    </div>
</div>
</div>
    )
}