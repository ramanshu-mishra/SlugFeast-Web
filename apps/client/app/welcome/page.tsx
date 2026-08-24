"use client";

import { useEffect } from "react";
import CardSlider from "../../components/cardSlider";
import { LoadingText } from "../../components/LoadingText";
import { AuthFlow } from "../../components/login";
import SlugEyes from "../../components/slugEye";
import { useGetWalletInfo } from "../../hooks/useGetWalletInfo";
import { useRouter } from "next/navigation";


export default function Page() {
    const {isConnected} = useGetWalletInfo();
    const router = useRouter();
    useEffect(()=>{
        if(!isConnected){
            router.push("/");
        }
    }, []);

    
    return (
        <div
            className="fixed inset-0 z-[9999] h-screen w-screen flex  items-center bg-neutral-950"
            style={{ pointerEvents: 'all' }}
        >
           <div className="basis-[60%] flex flex-col h-full">
                <AuthFlow/>
           </div>
            <div className="w-full h-full flex  items-center flex-col">
                    
                     <div className="py-15">
                    <LoadingText/>
                </div>
                <div>
                    <CardSlider/>
                </div>
            </div>
        </div>
    );
}


