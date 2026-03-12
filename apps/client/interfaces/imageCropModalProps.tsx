export interface ImageCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImage: File) => void;
}