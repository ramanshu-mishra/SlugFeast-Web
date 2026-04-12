import { Request, Response } from "express";
import { router } from "./SingleRouter";
import { prisma } from "@repo/database/client";
import { isAddress } from "ethers";
import Big from "big.js";

interface MessageResponse{
    bondingCurveProgress: number,
    marketCap: string,
    marketCap_usd: string
    currentPrice: string,
    currentPrice_usd: string,
    athPrice: string,
    athPrice_usd:string,
    athProgress: string,
    coinAddress: `0x${string}`,
    athCap : string,
    athCap_usd: string

}

type BinanceTickerPrice = {
	symbol: string;
	price: string;
};

type EthUsdConversion = {
    ethValue: string;
    usdValue: string;
    ethUsdPrice: string;
};


async function fetchEthUsdConversion(ethValue: string): Promise<EthUsdConversion> {
	const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");

	if (!res.ok) {
		throw new Error("Could not fetch ETH/USD price from Binance");
	}

	const data = (await res.json()) as BinanceTickerPrice;
    let ethUsdPrice: Big;
    let ethValueBig: Big;

    try {
        ethUsdPrice = new Big(data.price);
        ethValueBig = new Big(ethValue);
    } catch {
        throw new Error("Invalid numeric value for ETH/USD conversion");
    }

    if (ethUsdPrice.lte(0)) {
		throw new Error("Invalid ETH/USD price received from Binance");
	}

    const usdValue = ethValueBig.times(ethUsdPrice);

	return {
        ethValue: ethValueBig.toString(),
        ethUsdPrice: ethUsdPrice.toString(),
        usdValue: usdValue.toFixed(6),
	};
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

        console.log("sending....... : ", messageRes);

    } catch (error) {
        console.error("Error in /getInfo/:coinAddress", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
})





const totalPoolTokens = new Big(process.env.POOL_TOKENS_UNLOCKED ?? "800000000000000");
const totalTokens = new Big(process.env.POOL_TOKENS_TOTAL ?? (10**9).toString()); 
const PRICE_SCALE = new Big(10).pow(12);
const WEI_SCALE = new Big(10).pow(18);




function getBondingCurveProgress(tokenInPool: Big){
    if (tokenInPool.lt(0) || totalPoolTokens.lte(0)) {
        return "0.00";
    }

    const progress = totalPoolTokens.minus(tokenInPool).div(totalPoolTokens).times(100);
    return progress.toFixed(2);
}

function getMarketCap(tokenInPool: Big, VETHinPool: Big){
    const priceOfToken = getPrice(tokenInPool, VETHinPool);
    if (priceOfToken.eq(0)) {
        return "0";
    }

    const marketCap = priceOfToken.times(totalTokens);
    return marketCap.toFixed(6);
}

function getPrice(tokenInPool: Big, VETHinPool: Big){
    if (tokenInPool.lte(0) || VETHinPool.lt(0)) {
        return new Big(0);
    }

    return (VETHinPool.div(tokenInPool).mul(10**6)); // price in weith
}


export async function parseMessageResponse(data: {
    poolTokens: string,
    VETH: string,
    athPrice: string,
    token: `0x${string}`
}){
    const poolTokens = new Big(data.poolTokens || "0");
    const veth = new Big(data.VETH || "0");
    const athPriceWei = new Big(data.athPrice || "0");
    const athPriceEth = athPriceWei.div(WEI_SCALE);

    const mc = getMarketCap(poolTokens, veth); //mc in weith
    const mcETH = new Big(mc).div(WEI_SCALE);
    const bcprogress = getBondingCurveProgress(poolTokens); //price in weith
    const currentPrice = getPrice(poolTokens, veth); //price in weith
    const athProgress = athPriceWei.gt(0)
        ? currentPrice.div(athPriceWei).times(100).toFixed(6)
        : "0.000000";
    const usd = await fetchEthUsdConversion(mcETH.toString());
    const usd_ath = await fetchEthUsdConversion(athPriceEth.toString());
    const usd_curr = await fetchEthUsdConversion(currentPrice.div(WEI_SCALE).toString());
    const athCap = athPriceWei.times(totalTokens).toString();
    const athCapEth = new Big(athCap).div(WEI_SCALE);
    const athCap_usd = await fetchEthUsdConversion(athCapEth.toString());

    

    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        marketCap_usd : usd.usdValue,
        coinAddress: data.token,
        currentPrice: currentPrice.toString(),
        currentPrice_usd: usd_curr.usdValue,
        athProgress,
        athPrice: athPriceWei.toString(),
        athPrice_usd: usd_ath.usdValue,
        athCap: athCap,
        athCap_usd: athCap_usd.usdValue
    }

    

    return message;
}













