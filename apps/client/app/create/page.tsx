"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect } from "react";
import {
  Plus,
  X,
  Twitter,
  Send,
  Globe,
  Instagram,
  Youtube,
  ChevronDown,
  ChevronUp,
  ImagesIcon,
  File as FileIcon,
  Image as ImageIcon,
  AlertCircle,
  Check,
  Server
} from "lucide-react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import { cn } from "../../utility/cn";
import { SocialInput } from "../../components/socialInput";
import { SocialLink } from "../../interfaces/socialInput";
import { ImageCropModal } from "../../components/cropImage";
import { useAccount, useConnect, useConnection } from "wagmi";
import { useGetNonce } from "../../hooks/useGetNonce";
import { useCreateToken } from "../../hooks/useCreateToken";
import { useCreateTokenOnChain } from "../../hooks/useCreateTokenOnChain";
import { WalletConnect } from "../../components/walletConnect";
import { useQueryClient } from "@tanstack/react-query";
const ServerAddress = process.env.NEXT_PUBLIC_SERVER_ADDRESS;



export default function Page() {
  const [coinName, setCoinName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [showSocialSection, setShowSocialSection] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const {isConnected, address} = useConnection();
  const {isPending: noncePending, error: nonceError, data: nonceData, refetch: fetchNonce} = useGetNonce(address as `0x${string}`);
  const {data: tokenData, error: tokenError, loading, createToken} = useCreateToken();
  const {coinOnChain, coinOnChainError, coinOnChainLoading, createTokenOnChain } = useCreateTokenOnChain();
  const [creatingCoin, setCreatingCoin] = useState<boolean>(false);
  const [BtnLabel, setBtnLabel] = useState<string>("Create Coin");
  const queryClient = useQueryClient();
  
  
  
  

  const platformIcons: { [key: string]: any } = {
    x: Twitter,
    telegram: Send,
    website: Globe,
    instagram: Instagram,
    youtube: Youtube,
  };

  const platformLabels: { [key: string]: string } = {
    x: "X (Twitter)",
    telegram: "Telegram",
    website: "Website",
    instagram: "Instagram",
    youtube: "YouTube",
  };

  const addSocialLink = (platform: string, url: string) => {
    if (url.trim()) {
      setSocialLinks([
        ...socialLinks,
        {
          id: Date.now().toString(),
          platform,
          url,
        },
      ]);
    }
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  // Validate video resolution and aspect ratio
  const validateVideo = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const width = video.videoWidth;
        const height = video.videoHeight;
        
        // Check min resolution (720p)
        if (width < 426 || height < 240) {
          setFileError("Video resolution must be at least 720p (1280x720)");
          resolve(false);
          return;
        }
        
        // Check aspect ratio (16:9 or 9:16)
        const aspectRatio = width / height;
        const is16_9 = Math.abs(aspectRatio - 16/9) < 0.05;
        const is9_16 = Math.abs(aspectRatio - 9/16) < 0.05;
        
        if (!is16_9 && !is9_16) {
          setFileError("Video must have 16:9 or 9:16 aspect ratio");
          resolve(false);
          return;
        }
        
        resolve(true);
      };
      
      video.onerror = () => {
        setFileError("Error loading video file");
        resolve(false);
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFileError(null);

    // Check file type
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const isImage = ["jpg", "jpeg", "gif", "png", "webp"].includes(fileExtension || "");
    const isVideo = ["mp4", "mov", "avi", "mkv", "wmv", "webm", "flv"].includes(fileExtension || "");

    if (!isImage && !isVideo) {
      setFileError("Please select a valid image (.jpg, .jpeg, .gif, .png) or video (.mp4, .mov, .avi, .mkv, .wmv, .webm, .flv) file");
      return;
    }

    // Check file size
    const maxSize = isImage ? 15 * 1024 * 1024 : 30 * 1024 * 1024; // 15MB for images, 30MB for videos
    if (selectedFile.size > maxSize) {
      setFileError(`File size must be less than ${isImage ? "15MB" : "30MB"}`);
      return;
    }

    if (isImage) {
      const isGif = fileExtension === "gif";
      
      if (isGif) {
        // GIFs bypass cropping to preserve animation
        setFile(selectedFile);
        setFilePreviewUrl(URL.createObjectURL(selectedFile));
        setFileType("image");
      } else {
        // For other images, open crop modal
        const imageUrl = URL.createObjectURL(selectedFile);
        setTempImageSrc(imageUrl);
        setShowCropModal(true);
        setFileType("image");
      }
    } else if (isVideo) {
      // For videos, validate resolution and aspect ratio
      const isValid = await validateVideo(selectedFile);
      if (isValid) {
        setFile(selectedFile);
        setFilePreviewUrl(URL.createObjectURL(selectedFile));
        setFileType("video");
      }
    }

    // Reset input value so same file can be selected again
    e.target.value = "";
  };

  // Handle cropped image
  const handleCropComplete = (croppedFile: File) => {
    setFile(croppedFile);
    setFilePreviewUrl(URL.createObjectURL(croppedFile));
    setFileType("image");
  };

  async function storeFileToBucket(fileName: string, fileType: string){
    const res = await fetch(`${ServerAddress}/uploadImage`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "publickey": address as string
      },
      body: JSON.stringify({
          fileType,
          fileName
      })
    });

    const data = await res.json();
    return data;
  }


  


  const handleSubmit = async() => {
    // first I need to upload file to S3 let me call an async function for this
    setCreatingCoin(true);
    setBtnLabel('Creating...');
    try{
    const fileName = file?.name as string;
    const fileType = file?.type as string;
    const getUrl  = await storeFileToBucket(fileName, fileType);
    let url, key, publicUrl;
    if(!getUrl.success){
      console.log(getUrl.message);
      return;
    }
    else{
      url = getUrl.uploadUrl;
      key = getUrl.key;
      publicUrl = getUrl.publicUrl;
    }
    setBtnLabel("Uploading Coin Image...");
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": fileType  
      },
      body: file
    });

    



    if(!res.ok){
      console.log("something went Wrong");
      alert("something went wrong");
      return;
    }

    console.log("file uploaded to S3");

    // sending request to backend to upload metadata;
    setBtnLabel("Checking Chain Status...");
    const {data} = await fetchNonce();
    if(nonceError){
      throw  new Error("Could not fetch nonce from chain");
    }

    const nonce = Number(data);
    console.log("raw data is ", data);
    console.log("data of refetch is", nonce);

    setBtnLabel("Uploading coin metadata...");
    const uploadMetadataToBackend = await createToken({
      tokenName: coinName,
      symbol,
      description,
      imageUrl: publicUrl as string,
      socials: Object.fromEntries(socialLinks.map(item=>[item.platform, item.url])),
    }, nonce, address as `0x${string}`);

    if(tokenError) throw new Error(tokenError instanceof Error ? tokenError.message : "Could not create Token");

    const signature = uploadMetadataToBackend.signature as string;
    const hash = uploadMetadataToBackend.hash as string;
    const id = uploadMetadataToBackend.id as string;

    console.log("signature is : ", signature);


    // send tokenCreation request to Chain
    setBtnLabel("Creating Coin Onchain...");
    const token_data = await createTokenOnChain({
      name: coinName,
      symbol,
      metadata_uri : `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/coin/${hash}`,
      nonce: nonce,
      signature,
      id: id,
      publicKey: address as `0x${string}`
    });

    if(coinOnChainError){
      throw new Error("Could not create coin onchain");
    }

    if(token_data){
      queryClient.invalidateQueries({ queryKey: ['coins'] });
    }
    
    console.log(token_data);

    const coinAddress = token_data.to as string;

    await fetch(`${ServerAddress}/updateAddress`, {
      method: "GET",
      headers:{
        "address": coinAddress,
        "id" : id.toString()
      }
    });
    

    }
    catch(e){
      const errorMessage = e instanceof Error ? e.message : "Something went Wrong";
      console.log(errorMessage);
    }
    finally{
      setCreatingCoin(false);
      setBtnLabel("Create Coin");
    }
    
    
    

  };

  




  return (
    <div className="flex w-full flex-wrap justify-center gap-16 px-6 py-8 flex-1 h-full text-neutral-50">
      <div className="flex flex-col max-w-2xl w-full gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Create New Coin</h1>
          <h2 className="text-md text-neutral-100">Coin Details</h2>
          <p className="text-sm text-neutral-400">
            Choose carefully, coins cannot be modified once they are created
          </p>
        </div>

        <div className="flex w-full flex-col gap-6 rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-8">
          <div className="flex gap-2">
            {/* Coin Name */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-neutral-300">
                Coin Name
              </label>
              <input
                type="text"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
                placeholder="Name your coin"
                className="px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-neutral-50 focus:outline-none transition-colors"
              />
            </div>

            {/* Symbol */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium text-neutral-300">
                Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="Add a coin symbol (e.g. FLOKI)"
                className="px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-neutral-50 focus:outline-none transition-colors uppercase"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your coin..."
              rows={4}
              className="px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 focus:border-neutral-50 focus:outline-none transition-colors resize-none"
            />
            <span className="text-xs text-neutral-500">
              {description.length} / 500 characters
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setShowSocialSection(!showSocialSection)}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
            >
              <span className="text-sm font-medium text-neutral-300">
                Add Socials{" "}
                {socialLinks.length > 0 && `(${socialLinks.length})`}
              </span>
              {showSocialSection ? (
                <ChevronUp className="w-5 h-5 text-neutral-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-400" />
              )}
            </button>

            <AnimatePresence>
              {showSocialSection && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-3 overflow-hidden"
                >
                  {/* Instagram */}
                  <SocialInput
                    platform="instagram"
                    icon={Instagram}
                    label="Instagram"
                    placeholder="https://instagram.com/yourusername"
                    existingLink={socialLinks.find(
                      (l) => l.platform === "instagram",
                    )}
                    onAdd={(url) => addSocialLink("instagram", url)}
                    onRemove={(id) => removeSocialLink(id)}
                  />

                  {/* X (Twitter) */}
                  <SocialInput
                    platform="x"
                    icon={Twitter}
                    label="X (Twitter)"
                    placeholder="https://x.com/yourusername"
                    existingLink={socialLinks.find((l) => l.platform === "x")}
                    onAdd={(url) => addSocialLink("x", url)}
                    onRemove={(id) => removeSocialLink(id)}
                  />

                  {/* Telegram */}
                  <SocialInput
                    platform="telegram"
                    icon={Send}
                    label="Telegram"
                    placeholder="https://t.me/yourchannel"
                    existingLink={socialLinks.find(
                      (l) => l.platform === "telegram",
                    )}
                    onAdd={(url) => addSocialLink("telegram", url)}
                    onRemove={(id) => removeSocialLink(id)}
                  />

                  {/* YouTube */}
                  <SocialInput
                    platform="youtube"
                    icon={Youtube}
                    label="YouTube"
                    placeholder="https://youtube.com/@yourchannel"
                    existingLink={socialLinks.find(
                      (l) => l.platform === "youtube",
                    )}
                    onAdd={(url) => addSocialLink("youtube", url)}
                    onRemove={(id) => removeSocialLink(id)}
                  />

                  {/* Website */}
                  <SocialInput
                    platform="website"
                    icon={Globe}
                    label="Website"
                    placeholder="https://yourwebsite.com"
                    existingLink={socialLinks.find(
                      (l) => l.platform === "website",
                    )}
                    onAdd={(url) => addSocialLink("website", url)}
                    onRemove={(id) => removeSocialLink(id)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Image upload */}

        <div className="flex flex-col p-5 bg-neutral-900 rounded-lg border border-neutral-700">
          <div className="relative flex h-80 min-h-44 w-full flex-col items-center justify-center  rounded-lg border border-dashed border-white/30 bg-transparent transition-colors duration-200">
          {
            isConnected ?
            <>
            <ImagesIcon className="my-2 " size={40}></ImagesIcon>
            <div>Select video or image to upload</div>
            <div className="text-neutral-500">or drag and drop it here</div>
            <div>
              <label
                className="cursor-pointer flex justify-center items-center p-2 bg-green-400 rounded-xl text-neutral-800 text-muted text-md my-2"
                htmlFor="upload-image"
              >
                Select File
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.gif,.png,.mp4,.mov,.avi,.mkv,.wmv,.webm,.flv"
                className="hidden"
                id="upload-image"
                onChange={handleFileSelect}
              ></input>
            </div>
            </> : <WalletConnect/>
            }
          </div>
          <div className="flex flex-col gap-4 sm:flex-row my-2">
            <div className="flex w-full flex-col gap-3 px-3 py-2 text-[#9da3ae] sm:w-1/2">
              <FileIcon />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-[#F8FAFC]">
                  File size and type
                </p>
                <ul className="list-disc pl-3 text-xs">
                  <li>
                    Image - max 15mb. '.jpg', '.gif' or '.png' recommended
                  </li>
                  <li>Video - max 30mb. '.mp4', '.mov', '.webm' or '.avi' supported</li>
                </ul>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 px-3 py-2 text-[#9da3ae] sm:w-1/2">
              <ImageIcon />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-[#F8FAFC]">
                  Resolution and aspect ratio
                </p>
                <ul className="list-disc pl-3 text-xs">
                  <li>Image - min. 1000x1000px, 1:1 square recommended</li>
                  <li>Video - 16:9 or 9:16, 720p+ required</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Error Display */}
          {fileError && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg mt-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-400">{fileError}</p>
            </div>
          )}
          
          
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!coinName || !symbol || !description || creatingCoin || !isConnected}
          className="w-full mt-4 px-6 py-3 rounded-lg bg-green-400 hover:from-mint hover:to-purple-700 text-neutral-900 disabled:from-neutral-700 disabled:to-neutral-700 disabled:cursor-not-allowed transition-all font-semibold my-4 active:scale-95 cursor-pointer"
        >
          {BtnLabel}
        </button>
      </div>

      {/* Preview Panel */}
      <div className="flex flex-col max-w-md w-full gap-6">
        <div className="flex flex-col ">
          <h2 className="text-xl font-bold">Preview</h2>
          <p className="text-sm text-neutral-500">
            See how your coin will appear
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-neutral-700 bg-neutral-800 px-6 py-6">
          {filePreviewUrl ? (
            fileType === "image" ? (
              <img src={filePreviewUrl} alt="preview" className="w-full h-100 rounded-lg"/>
            ) : (
              <video 
                src={filePreviewUrl} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-100 rounded-lg" 
              />
            )
          ) : (
            <div className="flex items-center justify-center h-100 text-neutral-500">
              <p>Your media preview will appear here</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Image Crop Modal */}
      {showCropModal && tempImageSrc && (
        <ImageCropModal
          imageSrc={tempImageSrc}
          onClose={() => {
            setShowCropModal(false);
            setTempImageSrc(null);
          }}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
