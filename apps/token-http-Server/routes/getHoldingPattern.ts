import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";
import { isAddress } from "ethers";


interface holdingInterface{
    coinId: string,
    amount: number | bigint,
    userAddress: string,
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
    const coinWithHoldings = await prisma.coin.findFirst({
        where:{
            address : tokenAddress as string
        },
        select:{
            holdings: true,
        }
    });

    if(!coinWithHoldings){
        res.status(400).json({
            success: false,
            message: "Coin not found"
        });
        return;
    }

    const mapping = generateHoldingMapping(coinWithHoldings.holdings as holdingInterface[]);

    return res.status(200).json({
        success : true,
        coinId: tokenAddress,
        holding: mapping
    });
    
})




function generateHoldingMapping(holding : holdingInterface[]){
    const TOTAL_COINS = 800 * 10 ** 6 * 10 ** 6;
    const distributedSupply = holding.reduce((acc, entry) => acc + Number(entry.amount ?? 0), 0);
    const liquidityPoolAmount = Math.max(0, TOTAL_COINS - distributedSupply);

    return [...holding, {coinId: "liquidity-pool", userAddress: "Liquidity Pool", amount: liquidityPoolAmount}]
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .map((entry) => ({
            userAddress: entry.userAddress,
            amount: Number(entry.amount),
            percentageofHolding: (Number(entry.amount) / TOTAL_COINS) * 100,
        }));
}