"use client"
import { cn } from "../utility/cn";
import {motion} from "motion/react";
const Colors = {
    brown: "#9a3412",
    neutral: "#262626"
} 
const ThemeEnum = {
    highlighted: `py-2 px-4 bg-${Colors.brown}`,
    dormant: `py-2 px-4 bg-${Colors.neutral}`,
} 



export function Button({theme, className, children}:{theme: keyof typeof ThemeEnum, className?: string, children?: React.ReactNode}){
    return (
        <motion.div className={cn(ThemeEnum[theme], className)}>
            {children}
        </motion.div>
    )
}