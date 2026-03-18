"use client"
import { CardBanner } from "../../../components/cardBanner";
import { TradeOptions } from "../../../components/tradeOptions";
import { ArrowLeft } from "lucide-react";
import { useGetToken } from "../../../hooks/useGetToken";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { ChartComponent } from "../../../components/chart";
import Link from "next/link";

export default function Page() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug ?? "";
    const {data,error,isLoading,refetch} = useGetToken(slug);
    
    return (
        <>
        {
            !isLoading && data &&
        <div className="flex flex-1 mx-2 my-10 justify-center relative gap-5">
            <Link  href={"/"}><ArrowLeft className=" hover:scale-110 active:scale-90 transition-all duration-75 absolute -top-7 left-10 text-neutral-300 "></ArrowLeft></Link>
            <div className="flex flex-col gap-3 basis-[70%] py-1 text-neutral-50">
                <CardBanner coin={data.metaData} ></CardBanner>
                <ChartComponent></ChartComponent>
            </div>
            <div className="basis-[30%]  py-1">
                <TradeOptions coin={data.metaData}></TradeOptions>
            </div>
        </div>
}
        </>
    )
}

