"use client";

import { useRef, useState } from "react";
import { cn } from "../utility/cn";
import {motion} from "motion/react";
import { ImageCropModal } from "./cropImage";

export function EditProfile({
    className,
}: {
    className?: string;
}) {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showCropModal, setShowCropModal] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
                setSelectedFile(file);
                setShowCropModal(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedFile: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfileImage(event.target?.result as string);
            setSelectedFile(croppedFile);
            setShowCropModal(false);
        };
        reader.readAsDataURL(croppedFile);
    };
    return (
        <>
            <div className={cn("px-4 py-5 bg-neutral-800 flex flex-col h-fit rounded-xl ", className)}>
                <div className="flex justify-center items-center font-bold text-lg bg-linear-to-br from-emerald-400 to-cyan-500 text-neutral-950 rounded-lg"> Edit Your Profile</div>
                
                <motion.button
                    onClick={handleImageClick}
                    className="-translate-y-3.5 h-20 w-20 rounded-full shrink-0 bg-neutral-500 border-3 border-neutral-800 cursor-pointer hover:border-emerald-400 transition-colors overflow-hidden flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                >
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xs text-neutral-400 text-center px-2">Click to upload</span>
                    )}
                </motion.button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                
                <div className="px-2 h-full flex flex-col gap-3">
                    <InputSection label="Username" maxChar={24} placeholder="Enter your username" />
                    <InputSection label="Bio" type="textArea" maxChar={180} placeholder="Tell people about yourself" />
                    <motion.button
                        className="mt-4 w-full py-2 bg-emerald-400 text-neutral-950 font-semibold rounded-lg hover:bg-emerald-500 transition-colors duration-100"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Save Changes
                    </motion.button>
                </div>
            </div>

            {showCropModal && profileImage && (
                <ImageCropModal
                    imageSrc={profileImage}
                    originalFile={selectedFile}
                    onClose={() => setShowCropModal(false)}
                    onCropComplete={handleCropComplete}
                />
            )}
        </>
    )
}


function InputSection({
    label,
    maxChar,
    placeholder,
    type="text",
    className,
}: {
    label: string;
    maxChar: number;
    placeholder?: string;
    type?:string,
    className?: string;
}) {
    const [value, setValue] = useState("");

    return (
        <motion.div
            className={cn(
                "group rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 transition-colors focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-400",
                className,
            )}
        >
            <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-400 transition-colors group-focus-within:text-emerald-400">
                    {label}
                </label>
                <span className="text-[10px] text-neutral-500">
                    {value.length}/{maxChar}
                </span>
            </div>
            {   
                type == "textArea" ? 
                <textarea
                    value={value}
                    maxLength={maxChar}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    draggable={false}
                    className="h-24 w-full resize-none bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
                />
                : 
                <input
                type={type}
                value={value}
                maxLength={maxChar}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-transparent text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
            />
            }
            
        </motion.div>
    )
}


function DiscardWarning(){
    
}