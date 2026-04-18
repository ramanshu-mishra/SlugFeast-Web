"use client";

import { cn } from "../utility/cn";

export function CoinsCreated({className, coins}:{className?: string, coins: any[]}){
    return (
        <div className={cn("", className)}>
            <div>Created Coins</div>
        </div>
    )
}