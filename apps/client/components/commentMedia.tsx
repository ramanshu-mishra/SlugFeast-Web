"use client";

const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]);

const getPathWithoutQuery = (url: string) => {
    const queryStart = url.indexOf("?");
    const hashStart = url.indexOf("#");

    const cutOff = [queryStart, hashStart]
        .filter((index) => index >= 0)
        .reduce((min, value) => Math.min(min, value), Number.POSITIVE_INFINITY);

    if (!Number.isFinite(cutOff)) {
        return url;
    }

    return url.slice(0, cutOff);
};

const getExtension = (url: string) => {
    const sanitized = getPathWithoutQuery(url).trim().toLowerCase();
    const lastDotIndex = sanitized.lastIndexOf(".");

    if (lastDotIndex < 0 || lastDotIndex === sanitized.length - 1) {
        return "";
    }

    return sanitized.slice(lastDotIndex + 1);
};

const isVideoUrl = (url: string) => {
    const extension = getExtension(url);
    return VIDEO_EXTENSIONS.has(extension);
};

export function CommentMedia({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    if (isVideoUrl(src)) {
        return (
            <video
                src={src}
                controls
                playsInline
                preload="metadata"
                className={className ?? "max-w-sm rounded"}
            />
        );
    }

    return <img src={src} alt={alt} className={className ?? "max-w-sm rounded"} />;
}
