"use client";
import {motion} from "motion/react";
import Image from "next/image";
import logo from "../public/logo2.png";

export function LoadingText(){
    return (
        
        <motion.div
        layoutId="welcome"
        transition={{
            duration: 0.5
        }}
         className="flex flex-col items-center justify-center h-full w-full  gap-4">
          <Image src={logo} alt="SlugFeast Logo" height={80} />
          <motion.span
            className="text-white text-2xl font-semibold tracking-widest"
            style={{ animation: "fadeInUp 1s ease-in-out forwards" }}
          >
            SLUGFEAST
          </motion.span>
          <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}
          </style>
        </motion.div>
      
    )
}