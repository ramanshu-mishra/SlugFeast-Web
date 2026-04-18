import { useEffect, useRef, useState } from "react";

type ToastTimer = ReturnType<typeof setTimeout>;

export type ToastState = {
    show: boolean;
    message: string;
};

export function useToast(defaultDurationMs: number = 1800) {
    const [toast, setToast] = useState<ToastState>({ show: false, message: "" });
    const timerRef = useRef<ToastTimer | null>(null);

    const clearToastTimer = () => {
        if (!timerRef.current) return;
        clearTimeout(timerRef.current);
        timerRef.current = null;
    };

    const hideToast = () => {
        clearToastTimer();
        setToast((prev) => ({ ...prev, show: false }));
    };

    const showToast = (message: string, durationMs: number = defaultDurationMs) => {
        clearToastTimer();
        setToast({ show: true, message });

        if (durationMs > 0) {
            timerRef.current = setTimeout(() => {
                setToast((prev) => ({ ...prev, show: false }));
                timerRef.current = null;
            }, durationMs);
        }
    };

    useEffect(() => {
        return () => clearToastTimer();
    }, []);

    return {
        toast,
        showToast,
        hideToast,
    };
}

export function Toaster({
    show,
    message,
    className,
}: {
    show: boolean;
    message: string;
    className?: string;
}) {
    if (!show) return null;

    return (
        <div
            className={`pointer-events-none fixed left-1/2 top-4 z-100 -translate-x-1/2 rounded-md border border-neutral-700 bg-neutral-900/95 px-4 py-2 text-sm font-semibold text-neutral-100 shadow-lg ${className ?? ""}`}
        >
            {message}
        </div>
    );
}
