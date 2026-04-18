"use client";
import {motion} from "motion/react";
import Link from "next/link";

const Mlink = motion.create(Link);

export function MotionLink({link, children, className}: {link: string, children?: React.ReactNode, className?:string}){
    return (
        <Mlink href={link}>
            {children}
        </Mlink>
    )
}