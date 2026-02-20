import { NextFunction, Request, Response } from "express";

export function checkPublicKey(req:Request, res:Response, next: NextFunction){
    const key = req.headers.publicKey;
    if(!key){
        res.status(400).json({
            success: false,
            message: "Public-Key not provided"
        });
        return;
    }
    next();
}