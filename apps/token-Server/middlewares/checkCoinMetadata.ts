import { NextFunction, Request, Response } from "express";
import {prisma} from "@repo/database/client";

export async function checkCoinMetadata(req:Request, res:Response, next:NextFunction){
    const tokenName = req.body.tokenName;
    const symbol = req.body.symbol;
    const description = req.body.description;
    const socials = req.body.socials;
    const nonce = req.headers.nonce;
    
    
    
    if(!tokenName || !symbol || !description || !socials || !nonce || isNaN(Number(nonce))){
        res.status(400).json({
            success: false,
            message: "insufficient metadata"
        });
        return;
    }

    next();
}