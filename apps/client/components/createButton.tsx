"use effect";
import {motion} from "motion/react";
import {useRouter} from "next/navigation";
import { cn } from "../utility/cn";
import { Coins } from "lucide-react";
import { useState } from "react";
import Link from "next/link";


export default function Create({className}:{className?:string}){
   
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Link href={"/create"}>
        <motion.div className={cn("flex gap-2 rounded-3xl px-4 py-2 text-neutral-950 font-bold border border-neutral-700", className)}
            onHoverStart= {()=>{
                setIsHovered(true);
            }}
            onHoverEnd={()=>{
                setIsHovered(false);
            }}
            whileHover={{
                scale: 1.03,
            }}
            whileTap={{
                scale: 0.98
            }}
            
        >
                <Coins style={isHovered? {
                    color: "var(--color-green-200)",
                    strokeWidth: 3,
                    transitionDuration: "300ms"
                }: {

                }} className="w-5 h-5 text-neutral-950" strokeWidth={2} />
                <div>Create</div>
        </motion.div>
        </Link>
    )
}