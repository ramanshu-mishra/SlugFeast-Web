import { MessageResponse, rawData} from "../interfaces/messageInterface";
import {prisma} from "@repo/database/client";
import { RedisClient } from "../server";
import { fetchEthUsdConversion } from "./priceConversion";
import Big from "big.js";

const totalPoolTokens = new Big(process.env.POOL_TOKENS_UNLOCKED ?? "800000000000000");
const totalTokens = new Big(process.env.POOL_TOKENS_TOTAL ?? "1000000000");
const WEI_SCALE = new Big(10).pow(18);
const PRICE_SCALE = new Big(10).pow(12);
const REDIS_ATH_KEY = process.env.REDIS_ATH_KEY ?? "ATHPrice";




function getBondingCurveProgress(tokenInPool: Big){
    if (tokenInPool.lt(0) || totalPoolTokens.lte(0)) {
        return "0.00";
    }

    return totalPoolTokens.minus(tokenInPool).div(totalPoolTokens).times(100).toFixed(2);
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

    return VETHinPool.div(tokenInPool).mul(10**6);
}


export async function parseMessageResponse(data: rawData){
    const poolTokens = new Big(String(data.poolTokens ?? "0"));
    const poolVeth = new Big(String(data.poolVETHs ?? "0"));
    const mc = getMarketCap(poolTokens, poolVeth);
    const bcprogress = getBondingCurveProgress(poolTokens);
    const currentPrice = getPrice(poolTokens, poolVeth);

    let ATHprice = await getATHfromRedis(data.token);
    let athPriceRes:any;
    if(!ATHprice){
        athPriceRes = await prisma.coin.findFirst({
        where:{
            address: data.token
        },
        select:{
            // @ts-ignore
            ATHPrice: true
        }
    });


        if(!athPriceRes){
        throw new Error("Coin not found");
        }

        const dbAth = new Big(String(athPriceRes.ATHPrice ?? "0"));
        const currentPriceWei = currentPrice;
        ATHprice = (dbAth.gt(currentPriceWei) ? dbAth : currentPriceWei).toString();

        await RedisClient.hSet(REDIS_ATH_KEY, data.token, athPriceRes.ATHPrice);
    }
    
    
    const athPriceWei = new Big(String(ATHprice ?? athPriceRes?.ATHPrice ?? "0"));
    const athPriceEth = athPriceWei.div(WEI_SCALE);
    const athProgress = athPriceWei.gt(0)
        ? currentPrice.div(athPriceWei).times(100).toFixed(6)
        : "0.000000";

    const usd = await fetchEthUsdConversion(Number(new Big(mc).div(WEI_SCALE).toString()));
    const usd_ath = await fetchEthUsdConversion(Number(athPriceEth.toString()));
    const usd_curr = await fetchEthUsdConversion(Number(currentPrice.div(WEI_SCALE).toString()));
    const athCap = athPriceWei.times(totalTokens).toString();
    const athCapEth = new Big(athCap).div(WEI_SCALE);
    const athCap_usd = await fetchEthUsdConversion(Number(athCapEth.toString()));

    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        marketCap_usd: (usd ? usd.usdValue : 0).toString(),
        coinAddress: data.token,
        athProgress,
        currentPrice: currentPrice.toString(),
        currentPrice_usd: (usd_curr ? usd_curr.usdValue : 0).toString(),
        // @ts-ignore
        athPrice: athPriceWei.toString(),
        athPrice_usd : (usd_ath ? usd_ath.usdValue : 0).toString(),
        athCap,
        athCap_usd: athCap_usd.usdValue.toString()
    }

    return message;
}

async function getATHfromRedis(coinAddress: `0x${string}`){
    const ath = await RedisClient.hGet(REDIS_ATH_KEY, coinAddress);
    return ath;
}







