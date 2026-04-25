"use client";

import {motion} from "motion/react";
import { EditProfile } from "./editProfile";
import { RefObject } from "react";



export function ProfileEditComponent({editOpen, editRef}:{editOpen:boolean, editRef:RefObject<HTMLDivElement>}){
    
    return (
        <div className="absolute">
             {editOpen && (
                <motion.div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[5px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={close}
                />
            )}
            
            {editOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="pointer-events-auto" ref={editRef}>
                        <EditProfile className="w-96" />
                    </div>
                </motion.div>
            )}
        </div>
        
    )
}