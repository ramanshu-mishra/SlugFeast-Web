"use client"
import { CardBanner } from "../../../components/cardBanner";
import { TradeOptions } from "../../../components/tradeOptions";
import { ArrowLeft } from "lucide-react";
import { useGetToken } from "../../../hooks/useGetToken";
import { useParams } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import { ChartComponent } from "../../../components/chart";
import { BondingCurve } from "../../../components/bondingCurve";
import Link from "next/link";
import { TopHolders } from "../../../components/topHolders";
import { Chat_n_Trade } from "../../../components/chat_n_trade";
import { CoinRTCManager } from "../../../serviceClasses/coinRTCManager";
import { MessageResponse_TokenData, TradeEvent } from "@repo/messaging/interfaces";
import { useWSConnection } from "../../../hooks/useWSConnection";

export default function Page() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug ?? "";
    const {data,error,isLoading,refetch} = useGetToken(slug);
    const coinManager : RefObject<CoinRTCManager> = useRef(CoinRTCManager.getCoinRTCManager());
    const wsClient = coinManager.current.getWSClient();
    const {open} = useWSConnection(wsClient);
    const unsubscribeRef = useRef<null | (() => void)>(null);

    useEffect(() => {
        if (!open || !slug || unsubscribeRef.current) {
            return;
        }

        unsubscribeRef.current = coinManager.current.subscribe(slug as `0x${string}`) ?? null;
    }, [open, slug]);

    useEffect(() => {
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, []);




    return (
        <>
        {
            !isLoading && data &&
        <div className="flex flex-1 mx-2 my-10 justify-center relative gap-5 ">
            <Link  href={"/"}><ArrowLeft className=" hover:scale-110 active:scale-90 transition-all duration-75 absolute -top-7 left-10 text-neutral-300 "></ArrowLeft></Link>
            <div className="flex flex-col gap-3 basis-[70%] py-1 text-neutral-50 ">
                <CardBanner coin={data.metaData} ></CardBanner>
                <div className='px-6'>
                    <ChartComponent token={data.metaData.address ?? slug}></ChartComponent>
                </div>
                
                <Chat_n_Trade coinAddress={slug as `0x${string}`}></Chat_n_Trade>
            </div>
            <div className="flex basis-[30%]  py-1 flex-col  gap-2 ">
                <TradeOptions coin={data.metaData}></TradeOptions>
                <BondingCurve address={slug as `0x${string}`}></BondingCurve>
                <TopHolders coinAddress={slug as `0x${string}`}></TopHolders>
            </div>
        </div>
}
        </>
    )
}

