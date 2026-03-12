import crypto from "crypto";
import {  Request, Response, NextFunction } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {checkPublicKey} from "../middlewares/checkPublicKey";
import {prisma} from "@repo/database/client";
import { router } from "./SingleRouter";
import { tokenExists } from "../middlewares/tokenExists";
  
// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  },
  // requestChecksumCalculation: "WHEN_REQUIRED"
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "slugfeast-bucket";

// route to generate once time url to for AWS S3 

/**
 * POST /uploadImage
 * Generates a presigned URL for direct upload to S3
 * - Expires after 5 minutes
 * - One-time use (unique key per request)
 */
router.post("/uploadImage", checkPublicKey, async (req: Request, res: Response) => {
  try {
    const { fileType, fileName } = req.body;

    if (!fileType || !fileName) {
      return res.status(400).json({
        success: false,
        message: "fileType and fileName are required"
      });
    }

    // Generate a unique key for one-time use
    const uniqueId = crypto.randomUUID();
    const timestamp = Date.now();
    const fileExtension = fileName.split('.').pop();
    const key = `uploads/${timestamp}-${uniqueId}.${fileExtension}`;

    // Create a PutObjectCommand for the presigned URL
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    // Generate presigned URL that expires in 5 minutes (300 seconds)
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300 // 5 minutes
    });

    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || "ap-south-2"}.amazonaws.com/${key}`;

    // Return the presigned URL and key
    res.status(200).json({
      success: true,
      uploadUrl,
      key,
      publicUrl,
      expiresIn: 300,
      message: "Presigned URL generated successfully. Valid for 5 minutes and one-time use only."
    });

  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate upload URL",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

router.get("/imageUrl", checkPublicKey , tokenExists ,async(req,res)=>{
  const coin  = JSON.parse(req.headers.coin as string);
  const imageUrl = coin.imageUrl;

  if(!imageUrl){
    res.status(400).json({
      success: false,
      message: "Image not found"
    });
    return;
  }

  res.status(200).json({
    success: true,
    imageUrl: imageUrl
  });
});






export default router;

