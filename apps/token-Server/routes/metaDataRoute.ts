import { Request, Response, NextFunction } from "express";
import { router } from "./SingleRouter";
import {prisma} from "@repo/database/client";
import {checkPublicKey} from "../middlewares/checkPublicKey";
import jwt from "jsonwebtoken"
const jwtSecret = process.env.JWT_SECRET;

router.get("/metaData", async(req:Request,res:Response)=>{
    const address = req.headers.address;

    const coin= await prisma.coin.findFirst({
        where:{
            address: address as string
        },
        include:{
            tokenHash: true,
            user: true
        }
    });

    if(!coin){
        res.status(400).json({
            success: false,
            message: "Coin not found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        metaData: {
            ...coin
        }
    });
})

router.get("/coin/:hash", async(req:Request, res:Response)=>{
    const hash = req.params.hash;
    
   
    
    try{
      const coin = await prisma.coin.findFirst({
        where: {
            tokenHash :{
                hash : hash as string
            }
        },
        include:{
            socials : true
        }
      });

      if(!coin){
        res.status(400).json({
            success: false,
            message: "coin not found"
        });
        return;
      }

        // Return coin metadata
        res.status(200).json({
            success: true,
            metadata: {
                address: coin.address,
                tokenName: coin.tokenName,
                symbol: coin.symbol,
                imageUrl: coin.imageUrl,
                description: coin.description,
                graduated: coin.graduated,
                socials: coin.socials
            }
        });
    }
    catch(error){
        console.error("Error verifying token or fetching coin:", error);
        res.status(400).json({
            success: false,
            message: "Invalid hash provided or token expired"
        });
    }
})

const pageSize = 48;     


router.get("/getAllCoins", async(req:Request, res:Response)=>{
    const page = Number(req.headers.page);
    if(!page  || page <= 0){res.status(400).json({
        success: false,
        message: "invalid page number"
    });
    return;
}   

    const skip = (page-1)*pageSize;
    try{
        const coins = await prisma.coin.findMany({
            where: {},
            skip: skip,
            take: pageSize,
            include:{
                user:true,
                socials: true,
                tokenHash: true
            }
        });

        res.status(200).json({
            success: true,
            message: `coins for page ${page}`,
            coins
        });
    }
    catch(e){
        const errorMessage = e instanceof Error ? e.message : "Server Side Error";
        res.status(400).json({
            success: false,
            message: "Could not fetch coins",
            error: errorMessage
        })
    }
})  