"use client";

import { RefObject, useEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { ProfileEditComponent } from "./ProfileEditComponent";
import { UserProfileDropDown } from "./UserProfileDropDown";
import {motion} from "motion/react";
import pfp from "../public/pfp-1.png";
export function UserProfileIcon(){
    const {open, setOpen, toggle, ref} = useClickOutside();
    const {open:editOpen, setOpen:setEditOpen, ref:editRef} = useClickOutside();
    const img = pfp.src;
    useEffect(()=>{
        if(editOpen){
            setOpen(false);
        }
    }, [editOpen]);
    return (
        <div ref={ref}>
            <motion.div
                className="h-10 w-10 rounded-full bg-neutral-50  relative cursor-pointer"
                onClick={() => toggle()}
                animate={
                    open
                        ? {
                              border: "2px solid",
                              borderColor: "var(--color-emerald-400)",
                          }
                        : {
                              border: "2px solid",
                              borderColor: "var(--color-neutral-700)"
                          }
                }
                transition={{
                    duration: 0.1,
                }}
            >
                <img src={img} alt="" />
            </motion.div>
            {open && (
                <motion.div
                    
                    className="absolute top-14 right-10 z-50"
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.1,
                    }}
                >
                    <UserProfileDropDown toggle={toggle} setEditOpen={setEditOpen} />
                </motion.div>
            )}
            <ProfileEditComponent editOpen={editOpen} editRef={editRef as RefObject<HTMLDivElement>} />
        </div>
    );
}