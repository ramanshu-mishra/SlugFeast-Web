import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";
import { isAddress } from "ethers";
import { normalizeAddress } from "../utility/normalizeAddress";


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
    const normalizedTokenAddress = normalizeAddress(tokenAddress);

    const coinWithHoldings = await prisma.coin.findFirst({
        where:{
            address : normalizedTokenAddress
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
    const TOTAL_COINS = 800_000_000n * 10n ** 6n;
    const distributedSupply = holding.reduce((acc, entry) => acc + BigInt(entry.amount ?? 0), 0n);
    const liquidityPoolAmount = TOTAL_COINS > distributedSupply ? TOTAL_COINS - distributedSupply : 0n;

    console.log(holding);
    console.log("___________________");

    return [...holding, {coinId: "liquidity-pool", userAddress: "Liquidity Pool", amount: liquidityPoolAmount}]
        .sort((a, b) => {
            const left = BigInt(a.amount);
            const right = BigInt(b.amount);
            if (left === right) return 0;
            return left > right ? -1 : 1;
        })
        .map((entry) => ({
            userAddress: entry.userAddress,
            amount: Number(entry.amount),
            percentageofHolding: (Number(entry.amount) / Number(TOTAL_COINS)) * 100,
        }));

    
}