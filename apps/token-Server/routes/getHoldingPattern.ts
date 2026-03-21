import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";
import { isAddress } from "ethers";

interface holdingInterface{
    coinId: string,
    amount: number,
    userAddress: string
}

router.get("/getHoldings/:tokenAddress", async(req:Request, res:Response)=>{
    const tokenAddress = req.params.tokenAddress;
    if(!isAddress(tokenAddress)){
        res.status(400).json({
            success: false,
            message: "Invalid Coin Address"
        })
        return;
    }
    const holdings = await prisma.coin.findFirst({
        where:{
            address : tokenAddress as string
        },
        select:{
            holdings: true,
        }
    });

    if(!holdings){
        res.status(400).json({
            success: false,
            message: "Coin not found"
        });
        return;
    }

    // @ts-ignore
    const mapping = generateHoldingMapping(holdings as holdingInterface[]);

    return res.status(200).json({
        success : true,
        coinId: tokenAddress,
        holding: mapping
    });
    
})




function generateHoldingMapping(holding : holdingInterface[]){
    const TOTAL_COINS = 10 ** 9 * 10 ** 6;

    return [...holding]
        .sort((a, b) => b.amount - a.amount)
        .map((entry) => ({
            userAddress: entry.userAddress,
            amount: entry.amount,
            percentageofHolding: (entry.amount / TOTAL_COINS) * 100,
        }));
}