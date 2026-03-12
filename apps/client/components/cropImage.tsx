import Cropper, { Area, Point } from "react-easy-crop";
import { useState, useCallback } from "react";
import { Check, X } from "lucide-react";


// Helper function to create image from cropped area
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
}

// Image Crop Modal Component
interface ImageCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImage: File) => void;
}

export function ImageCropModal({ imageSrc, onClose, onCropComplete }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropAreaComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        // Create File from Blob
        const croppedFile = new (File as any)([croppedBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        }) as File;
        onCropComplete(croppedFile);
        onClose();
      }
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative flex flex-col gap-4 w-full max-w-3xl mx-4 bg-neutral-900 rounded-xl border border-neutral-700 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Crop Image</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full h-96 bg-neutral-800 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropAreaComplete}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-300">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCropSave}
            className="px-6 py-2 rounded-lg bg-mint hover:bg-mint transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
}