import { Router,NextFunction , Request, Response} from "express";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



const router = Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
  },
  
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "slugfeast-bucket";


export function checkPublicKey(req:Request, res:Response, next: NextFunction){
    const key = req.headers['publickey'];
    if(!key){
        res.status(400).json({
            success: false,
            message: "Public-Key not provided"
        });
        return;
    }
    next();
}


router.post("/comments/uploadImage", checkPublicKey, async (req: Request, res: Response) => {
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
    const key = `comments/${timestamp}-${uniqueId}.${fileExtension}`;

    
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



export default router;








