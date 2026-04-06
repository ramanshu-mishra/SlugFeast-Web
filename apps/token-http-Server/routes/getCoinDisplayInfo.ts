import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";
import { isAddress } from "ethers";

interface MessageResponse{
    bondingCurveProgress: number,
    marketCap: string,
    currentPrice: string,
    athPrice: string,
    athProgress: string,
    coinAddress: `0x${string}`
}




router.get("/getInfo/:coinAddress", async (req:Request, res:Response)=>{
    try {
        const coinAddressParam = req.params.coinAddress;
        const rawAddress = (Array.isArray(coinAddressParam) ? (coinAddressParam[0] ?? "") : (coinAddressParam ?? "")).trim();

        if (!isAddress(rawAddress)) {
            res.status(400).json({
                success: false,
                message: "Invalid coin address"
            });
            return;
        }

        const coinAddress = rawAddress.toLowerCase() as `0x${string}`;

        // fetching the poolData from db
        const poolData = await prisma.coin.findFirst({
            where:{
                address: coinAddress
            }
        });

        if(!poolData){
            res.status(400).json({
                success: false,
                message: "Coin not found"
            });
            return;
        }

        const poolTokens = String((poolData as any).TokenAmount ?? "0");
        const vethAmount = String((poolData as any).VETHAmount ?? "0");
        const athPrice = String((poolData as any).ATHPrice ?? "0");

        const messageRes = await parseMessageResponse({
            poolTokens,
            VETH: vethAmount,
            athPrice,
            token: coinAddress
        });
        
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
    if (!Number.isFinite(tokenInPool) || tokenInPool < 0 || totalPoolTokens <= 0) {
        return "0.00";
    }

    const progress = (((totalPoolTokens - tokenInPool) / totalPoolTokens) * 100).toFixed(2);
    return progress;
}

function getMarketCap(tokenInPool: number, VETHinPool: number){
    const priceOfToken = getPrice(tokenInPool, VETHinPool);
    if (priceOfToken === 0) {
        return "0";
    }

    const marketCap = priceOfToken * totalTokens;
    return marketCap.toFixed(6);
}

function getPrice(tokenInPool: number, VETHinPool: number){
    const token = Number(tokenInPool);
    const veth = Number(VETHinPool);

    if (!Number.isFinite(token) || !Number.isFinite(veth) || token <= 0) {
        return 0;
    }

    const price = veth / token;
    return Number.isFinite(price) ? price : 0;
}


export async function parseMessageResponse(data: {
    poolTokens: string,
    VETH: string,
    athPrice: string,
    token: `0x${string}`
}){
    const poolTokens = Number(data.poolTokens);
    const veth = Number(data.VETH);
    const athPrice = Number(data.athPrice);

    const mc = getMarketCap(poolTokens, veth);
    const bcprogress = getBondingCurveProgress(poolTokens);
    const currentPrice = getPrice(poolTokens, veth);
    const athProgress = athPrice > 0 ? ((currentPrice / athPrice) * 100).toFixed(6) : "0.000000";


    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        coinAddress: data.token,
        currentPrice: currentPrice.toString(),
        athProgress,
        athPrice: Number.isFinite(athPrice) ? athPrice.toString() : "0"
    
    }

    return message;
}













