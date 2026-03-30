"use client"

import { useState } from "react"
import { CommentDisplay } from "./CommentDisplay";

export function Comments({coinAddress}:{coinAddress : `0x${string}`}){
    const userImage = "";
    const [sortOrder, setSortOrder] = useState<"newest"|"oldest">("newest"); 

    return (
        <div>
            <InputSection userImage={userImage}></InputSection>
            <CommentDisplay coinAddress={coinAddress} sortOrder={sortOrder}></CommentDisplay>
        </div>
    )
}


function InputSection({userImage}: {userImage: string}){
        const [text, setText] = useState<string>("");

        return (
            <div className="flex gap-4 px-2">
                <div className="rounded-full h-8 w-8 bg-yellow-300 ">
                    <img src={userImage} alt="pfp" className="object-cover h-full w-full flex justify-center items-center text-yellow-300 text-[0px]"/>
                </div>
                <div className="w-full">
                    <input type="text" placeholder="Add a comment..." className="w-full px-3 py-1 border bg-neutral-800 border-neutral-600 rounded focus:border-neutral-300 focus:outline-none" />
                </div>
            </div>
        )
}


