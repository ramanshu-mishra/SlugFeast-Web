"use client";

import { useEffect, useRef, useState } from "react";

type UseClickOutsideOptions = {
    initialOpen?: boolean;
    onOutsideClick?: () => void;
    listenWhenClosed?: boolean;
};

export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
    options: UseClickOutsideOptions = {},
) {
    const {
        initialOpen = false,
        onOutsideClick,
        listenWhenClosed = false,
    } = options;

    const [open, setOpen] = useState(initialOpen);
    const ref = useRef<T | null>(null);

    useEffect(() => {
        if (!listenWhenClosed && !open) return;

        const handleOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!ref.current || !target) return;
            if (ref.current.contains(target)) return;

            setOpen(false);
            onOutsideClick?.();
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, [open, onOutsideClick, listenWhenClosed]);

    return {
        ref,
        open,
        setOpen,
        close: () => setOpen(false),
        toggle: () => setOpen((prev) => !prev),
    };
}