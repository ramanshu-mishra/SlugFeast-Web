import cardBg from "../public/sharedCard.png";

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load image"));
        img.src = src;
    });
}

function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

export async function generateDisplayCardPng(coinSymbol: string, coinName: string): Promise<Blob> {
    const width = 1200;
    const height = 630;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Unable to create canvas context");
    }

    const bg = await loadImage(cardBg.src);
    const bgScale = Math.max(width / bg.width, height / bg.height);
    const bgWidth = bg.width * bgScale;
    const bgHeight = bg.height * bgScale;
    const bgX = (width - bgWidth) / 2;
    const bgY = (height - bgHeight) / 2;
    ctx.drawImage(bg, bgX, bgY, bgWidth, bgHeight);

    const radial = ctx.createRadialGradient(width / 2, height / 2, 60, width / 2, height / 2, width * 0.42);
    radial.addColorStop(0, "rgba(0,0,0,0.68)");
    radial.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    const symbolText = `$${coinSymbol.toUpperCase()}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 132px sans-serif";
    const symbolGradient = ctx.createLinearGradient(0, height * 0.26, 0, height * 0.58);
    symbolGradient.addColorStop(0, "#fde047");
    symbolGradient.addColorStop(0.5, "#f97316");
    symbolGradient.addColorStop(1, "#dc2626");
    ctx.fillStyle = symbolGradient;
    ctx.shadowColor = "rgba(255,115,0,0.5)";
    ctx.shadowBlur = 18;
    ctx.fillText(symbolText, width / 2, height / 2 - 36);
    ctx.shadowBlur = 0;

    const pillText = coinName.toUpperCase();
    ctx.font = "700 34px sans-serif";
    const pillPaddingX = 26;
    const pillWidth = Math.min(ctx.measureText(pillText).width + pillPaddingX * 2, width * 0.78);
    const pillHeight = 60;
    const pillX = (width - pillWidth) / 2;
    const pillY = height / 2 + 38;
    ctx.fillStyle = "rgba(0,0,0,0.48)";
    drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, 999);
    ctx.fill();
    ctx.strokeStyle = "rgba(249,115,22,0.35)";
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, 999);
    ctx.stroke();
    ctx.fillStyle = "#fed7aa";
    ctx.fillText(pillText, width / 2, pillY + pillHeight / 2 + 1);

    const footerText = "LETS START THE FEAST";
    const footerY = height - 72;
    ctx.font = "900 32px sans-serif";
    const footerTextWidth = ctx.measureText(footerText).width;
    const footerHalfWidth = Math.min((footerTextWidth + 48) / 2, width * 0.34);
    const footerLeftX = width / 2 - footerHalfWidth;
    const footerRightX = width / 2 + footerHalfWidth;

    ctx.strokeStyle = "rgba(255,237,213,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(footerLeftX, footerY - 22);
    ctx.lineTo(footerRightX, footerY - 22);
    ctx.moveTo(footerLeftX, footerY + 16);
    ctx.lineTo(footerRightX, footerY + 16);
    ctx.stroke();

    ctx.fillStyle = "#fed7aa";
    ctx.fillText(footerText, width / 2, footerY);

    const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((result) => resolve(result), "image/png");
    });

    if (!blob) {
        throw new Error("Unable to generate image blob");
    }

    return blob;
}
