"use client"
import { LogOut, User, Pencil, HelpCircle, LucideShare2 } from "lucide-react";
import {FaShare} from "react-icons/fa";
import Image from "next/image";
import { motion } from "motion/react";
import pfp from "../public/pfp-1.png"
import { useGetWalletInfo } from "../hooks/useGetWalletInfo";
import { Spinner } from "./spinner";
import Link from "next/link";
import { useClickOutside } from "../hooks/useClickOutside";

export function UserProfileDropDown({toggle, setEditOpen}: {toggle: ()=>void, setEditOpen: (x:boolean)=>void}) {
    const {logout, loggingOut, address}  = useGetWalletInfo();
    const user = {
        avatar: pfp.src, 
        username: "ram256",
        followers: 0,
    };
    return (
        <div className="w-80 rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl p-4 flex flex-col gap-2">
            {/* User Info */}
            <div className="flex items-center gap-3 pb-2 border-b border-neutral-800">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-700">
                    <Image src={user.avatar} alt="avatar" width={48} height={48} />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg text-neutral-100 flex items-center gap-1">
                        {user.username}
                        <motion.span className="text-neutral-400 text-base ml-2 "
                            whileHover={{
                                color: "var(--color-neutral-50)"
                            }}
                        ><FaShare className="h-4  cursor-pointer"/></motion.span>
                    </span>
                    <span className="text-xs text-neutral-400">{user.followers} followers</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1 mt-2">
                <Link href={`/profile/${address}`}><ProfileAction icon={<User className="w-5 h-5 stroke-2" />} label="View profile" onClick={()=>toggle()}/></Link>
                <ProfileAction icon={<Pencil className="w-5 h-5 stroke-2" />} label="Edit profile" onClick={() => { setEditOpen(true); }} />
                <ProfileAction icon={<HelpCircle className="w-5 h-5 stroke-2" />} label="Help & support" />
            </div>

            {/* Log out */}
            <motion.button
                whileHover={{ backgroundColor: "#2a2327"}}
                className="flex items-center gap-3 mt-2 px-3 py-2 rounded-xl text-red-400 hover:bg-neutral-800 font-semibold transition-colors cursor-pointer justify-between"
                type="button"
                onClick={async()=>{
                    await logout();
                    toggle();
                }}
            >   
            <div className="flex gap-2">
                <LogOut className="w-5 h-5" />
                Log out
            </div>
                {
                  loggingOut && <Spinner thickness="thin"/>
                }
            </motion.button>
        </div>
    );
}

function ProfileAction({ icon, label, hasSubmenu, onClick }: { icon: React.ReactNode; label: string; hasSubmenu?: boolean, onClick?: ()=>void }) {
    return (
        <motion.button
            onClick={onClick ?? (() => {})}
            whileHover={{ backgroundColor: "#232325"}}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-neutral-100  hover:bg-neutral-800 transition-colors cursor-pointer"
            type="button"
        >
            <span className="flex items-center gap-3">
                {icon}
                <span className="text-sm tracking-wide">{label}</span>
            </span>
            {hasSubmenu && (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-neutral-400"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6-6 6"/></svg>
            )}
        </motion.button>
    );
}

