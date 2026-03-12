import { NextFunction, Request, Response } from "express";
import {prisma} from "@repo/database/client";

export async function tokenExists(req:Request, res:Response, next: NextFunction){
    const address = req.headers.address;

    const coin = await prisma.coin.findFirst({
        where: {
            address: address as string
        }
    });
    if(!coin){
        res.status(400).json({
            success: false,
            message: "Token not found"
        });
        return;
    }

    req.headers.coin = JSON.stringify({...coin});
    next();
}