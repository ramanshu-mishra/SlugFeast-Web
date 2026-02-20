"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import menu from "../share/menu.json";
import { ChevronLeft, ChevronRight, Home, UserCircle2, MoreVertical, Coins } from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo2.png";
export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const menuItems = Object.entries(menu);

    return (
        <motion.div
            className="relative h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col"
            animate={{
                width: isCollapsed ? "80px" : "256px",
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Collapse/Expand Button */}
            <AnimatePresence>
                {isHovered && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="absolute -right-3 top-8 z-10 bg-gray-800 hover:bg-neutral-700 text-white rounded-full p-1.5 border border-gray-700 shadow-lg"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            <ChevronLeft className="w-4 h-4" />
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Logo/Header */}
            <div className="py-6 px-4 border-b border-neutral-800">
                <motion.div
                    className="flex items-center gap-3"
                    animate={{
                        justifyContent: isCollapsed ? "center" : "flex-start",
                    }}
                >
                    
                        <Image src={logo} alt="logo"  height={50}></Image>
                    
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-white font-semibold text-xl whitespace-nowrap overflow-hidden"
                            >
                                SlugFeast
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-3">
                    {menuItems.map(([label, path], index) => (
                        <li key={label}>
                            <motion.button
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors group relative"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Menu Icons */}
                                <span className="shrink-0 w-6 h-6 flex items-center justify-center">
                                    {index === 0 ? <Home  className="w-5 h-5 text-neutral-50" /> : 
                                     index === 1 ? <UserCircle2 className="w-5 h-5 text-neutral-50" /> : 
                                     index === 2 ? <MoreVertical className="w-5 h-5 text-neutral-50" /> : 
                                     <Coins className="w-5 h-5 text-neutral-50" />}
                                </span>

                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="whitespace-nowrap overflow-hidden text-left font-medium"
                                        >
                                            {label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Tooltip for collapsed state */}
                                {isCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
                                    >
                                        {label}
                                    </motion.div>
                                )}
                            </motion.button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-800">
                <motion.div
                    className="flex items-center gap-3 px-3 py-2"
                    animate={{
                        justifyContent: isCollapsed ? "center" : "flex-start",
                    }}
                >
                    <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full shrink-0" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm font-medium text-white whitespace-nowrap">User</p>
                                <p className="text-xs text-gray-400 whitespace-nowrap">user@example.com</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}