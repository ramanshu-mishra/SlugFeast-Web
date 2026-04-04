"use client";
import {motion} from "motion/react";
import { Image as ImageIcon, Link, SendHorizonal, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { ImageCropModal } from "./cropImage";
import { Spinner } from "./spinner";

export type InputImageAttachment = {
    file: File;
    previewUrl: string;
};

export type InputSectionSendPayload = {
    text: string;
    attachment?: InputImageAttachment;
};

const SUPPORTED_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif"]);

export function InputSection({
    userImage,
    onSend,
    isSending = false,
    sendError = null,
}: {
    userImage: string;
    onSend: (payload: InputSectionSendPayload) => Promise<boolean>;
    isSending?: boolean;
    sendError?: string | null;
}){
        const [text, setText] = useState<string>("");
        const [attachment, setAttachment] = useState<InputImageAttachment | undefined>(undefined);
        const [showCropModal, setShowCropModal] = useState(false);
        const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
        const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);
        const fileInputRef = useRef<HTMLInputElement | null>(null);

        const triggerSend = async () => {
            const didSend = onSend({
                text,
                attachment,
            });

            if (await didSend) {
                setText("");
                setAttachment(undefined);
            }
        };

        const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();
            void triggerSend();
        };

        const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0];
            if (!selectedFile) {
                return;
            }

            const extension = selectedFile.name.split(".").pop()?.toLowerCase() ?? "";
            if (!SUPPORTED_IMAGE_EXTENSIONS.has(extension)) {
                event.target.value = "";
                return;
            }

            const previewUrl = URL.createObjectURL(selectedFile);

            if (extension === "gif") {
                setAttachment({
                    file: selectedFile,
                    previewUrl,
                });
                event.target.value = "";
                return;
            }

            setPendingCropFile(selectedFile);
            setTempImageSrc(previewUrl);
            setShowCropModal(true);
            event.target.value = "";
        };

        const handleCropComplete = (croppedFile: File) => {
            const previewUrl = URL.createObjectURL(croppedFile);
            setAttachment({
                file: croppedFile,
                previewUrl,
            });
            setPendingCropFile(null);
        };

        const closeCropModal = () => {
            setShowCropModal(false);
            if (tempImageSrc) {
                URL.revokeObjectURL(tempImageSrc);
            }
            setTempImageSrc(null);
            setPendingCropFile(null);
        };

        return (
            <div className="flex flex-col gap-2 px-2">
                <div className="flex gap-4">
                    <div className="rounded-full h-8 w-8 bg-yellow-300 ">
                        <img src={userImage} alt="pfp" className="object-cover h-full w-full flex justify-center items-center text-yellow-300 text-[0px]"/>
                    </div>
                    <div className="w-full border flex gap-2 bg-neutral-800 border-neutral-600 focus:outline-1 focus:outline-neutral-500 rounded focus:border-neutral-300 items-center">
                        <input
                            type="text"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a comment..."
                            className="w-full px-3 py-1 focus:outline-0 rounded"
                        />
                        <button
                            type="button"
                            onClick={() => void triggerSend()}
                            className="mx-2 active:scale-95"
                            aria-label="Send comment"
                            disabled={isSending}
                        >
                            {isSending ? <Spinner size="sm" className="text-neutral-200" /> : <SendHorizonal />}
                        </button>
                    </div>
                </div>

                {sendError ? (
                    <p className="pl-12 text-xs text-red-400">
                        {sendError}
                    </p>
                ) : null}

                <motion.div className="flex items-center gap-3 pl-12 "
                style={ attachment ? {
                    marginLeft: "2rem",
                    marginRight: "2rem",
                    borderRadius: "2rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "1rem",
                    marginTop: "0.5rem",
                    backgroundColor : "var(--color-neutral-950)"
                }:
            {

            }}
                >
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-neutral-400 hover:text-neutral-200"
                        aria-label="Attach image or gif"
                    >
                        <Link size={16} />
                    </button>
                    {attachment ? (
                        <div className="flex flex-col gap-2 text-xs text-neutral-300 ">
                            <div className="flex items-center gap-2">
                                <ImageIcon size={14} />
                                <span>Attachment ready</span>
                            <button
                                type="button"
                                className="text-neutral-400 hover:text-neutral-200"
                                onClick={() => setAttachment(undefined)}
                                aria-label="Remove attachment"
                            >
                                <X size={14} />
                            </button>
                            </div>
                            <img
                                src={attachment.previewUrl}
                                alt="attachment preview"
                                className="max-w-50  border border-neutral-700 rounded-2xl"
                            />
                        </div>
                    ) : null}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.gif"
                        className="hidden"
                        onChange={(event) => void handleFileSelect(event)}
                    />
                </motion.div>

                {showCropModal && tempImageSrc ? (
                    <ImageCropModal
                        imageSrc={tempImageSrc}
                        originalFile={pendingCropFile as File}
                        onClose={closeCropModal}
                        onCropComplete={(croppedFile) => void handleCropComplete(croppedFile)}
                    />
                ) : null}
            </div>
        )
}