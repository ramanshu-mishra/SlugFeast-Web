import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";

interface MessageResponse{
    bondingCurveProgress: Number,
    marketCap: string,
    currentPrice: string,
    athPrice: string,
    athProgress: string,
    coinAddress: `0x${string}`
}


router.get("/getInfo/:coinAddress", async (req:Request, res:Response)=>{
    try {
        const coinAdress = req.params.coinAddress;

        // fetching the poolData from db
        const poolData = await prisma.coin.findFirst({
            where:{
                address: coinAdress as string
            },
            select:{
                // @ts-ignore
                TokenAmount: true,
                VETHAmount: true,
                ATHPrice: true
            }
        });

        if(!poolData){
            res.status(400).json({
                success: false,
                message: "Coin not found"
            });
            return;
        }

        const messageRes = parseMessageResponse({
            // @ts-ignore
            poolTokens: poolData.TokenAmount ,
            // @ts-ignore
            VETH: poolData.VETHAmount,
            token: coinAdress as `0x${string}`
        })
        
        res.status(200).json({
            success: true,
            data:{
                ...messageRes
            }
        });
    } catch (error) {
        console.error("Error in /getInfo/:coinAddress", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})





const totalPoolTokens = Number(process.env.POOL_TOKENS_UNLOCKED) || 800*10**6*10**6;
const totalTokens = Number(process.env.POOL_TOKENS_TOTAL) || 1*10**9*10**6; 




function getBondingCurveProgress(tokenInPool: number){
    const progress = (((totalPoolTokens - tokenInPool) / totalPoolTokens) * 100).toFixed(2);
    return progress;
}

function getMarketCap(tokenInPool: Number, VETHinPool: Number){
    const priceOfToken = getPrice(tokenInPool, VETHinPool);
    if (priceOfToken === 0) {
        return "0";
    }

    const marketCap = priceOfToken * totalTokens;
    return marketCap.toFixed(6);
}

function getPrice(tokenInPool: Number, VETHinPool: Number){
    const token = Number(tokenInPool);
    const veth = Number(VETHinPool);

    if (!Number.isFinite(token) || !Number.isFinite(veth) || token <= 0) {
        return 0;
    }

    const price = veth / token;
    return Number.isFinite(price) ? price : 0;
}


export async function parseMessageResponse(data: {
    poolTokens: Number,
    VETH: Number,
    token: `0x${string}`
}){
    const mc = getMarketCap(Number(data.poolTokens), Number(data.VETH));
    const bcprogress = getBondingCurveProgress(Number(data.poolTokens));

    const athPrice = await prisma.coin.findFirst({
        where:{
            address: data.token 
        },
        select:{
            // @ts-ignore
            ATHPrice: true
        }
    })

    if(!athPrice){
        throw new Error("Coin not found");
    }

    const currentPrice = getPrice(data.poolTokens, data.VETH);
    // @ts-ignore
    const athProgress = ((Number(currentPrice)/Number(athPrice.ATHPrice))*100).toFixed(6);


    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        coinAddress: data.token,
        currentPrice: currentPrice.toString(),
        athProgress,
        // @ts-ignore
        athPrice: athPrice.ATHPrice
    
    }

    return message;
}













