import crypto from "crypto";
import {  Request, Response, NextFunction } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import {checkPublicKey} from "../middlewares/checkPublicKey";
import {prisma} from "@repo/database/client";
import { router } from "./SingleRouter";
  
// ── S3 client ──────────────────────────────────────────────────────────────
const s3 = new S3Client({
  region: process.env["AWS_REGION"] ?? "us-east-1",
  credentials: {
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "",
    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "",
  },
});

// ── Multer-S3 storage ──────────────────────────────────────────────────────
const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env["AWS_S3_BUCKET"] ?? "",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const publicKey = (req as Request).query["publicKey"] as string | undefined;
      if (!publicKey) {
        cb(new Error("publicKey query parameter is required"));
        return;
      }
      const hash = crypto.createHash("sha256").update(publicKey).digest("hex");
      const ext = file.originalname.split(".").pop() ?? "bin";
      cb(null, `images/${hash}.${ext}`);
    },
  }),
  fileFilter(_req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// ── POST /images/upload ────────────────────────────────────────────────────
router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "No image file provided" });
      return;
    }

    const s3File = req.file as Express.MulterS3.File;
    const publicKey = req.query["publicKey"] as string;
    const hash = crypto.createHash("sha256").update(publicKey).digest("hex");

    res.status(200).json({
      message: "Image uploaded successfully",
      url: s3File.location,
      key: s3File.key,
      hash,
      bucket: s3File.bucket,
      size: s3File.size,
      mimetype: s3File.mimetype,
    });
  }
);

// ── Error handler for multer errors ───────────────────────────────────────
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
});


router.get("/imageUrl", checkPublicKey ,async(req,res)=>{
  const publicKey = req.headers.publicKey ;
  
  const user = await prisma.user.findFirst({
    where:{
      publicKey: publicKey as string
    }
  })

  if(!user){
    res.status(400).json({
      success: false,
      message: "publicKey does not exist"
    });
    return;
  }

  res.status(200).json({
    success: true,
    url: user.imageUrl
  });
})


export default router;

