import { Request, Response, NextFunction } from "express";
import { router } from "./SingleRouter";
import {prisma} from "@repo/database/client";
import {checkPublicKey} from "../middlewares/checkPublicKey";

router.get("/metaData", checkPublicKey,async(req:Request,res:Response)=>{
    const publicKey = req.headers.publicKey;

    const user = await prisma.user.findFirst({
        where:{
            publicKey: publicKey as string
        }
    });

    if(!user){
        res.status(400).json({
            success: false,
            message: "publicKey does not exists"
        });
        return;
    }

    res.status(400).json({
        success: true,
        metaData: {
            ...user
        }
    });
})