import { MessageResponse, rawData} from "../interfaces/messageInterface";
import {prisma} from "@repo/database/client";

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


export async function parseMessageResponse(data: rawData){
    const mc = getMarketCap(Number(data.poolTokens), Number(data.poolVETHs));
    const bcprogress = getBondingCurveProgress(Number(data.poolTokens));

    const athPrice = await prisma.coin.findFirst({
        where:{
            address: data.token
        },
        select:{
            // @ts-ignore
            ATHPrice: true
        }
    });


    if(!athPrice){
        throw new Error("Coin not found");
    }

    const currentPrice = getPrice(Number(data.poolTokens), Number(data.poolVETHs));
    // @ts-ignore
    const athProgress = ((Number(currentPrice)/Number(athPrice.ATHPrice))*100).toFixed(6);
    

    const message : MessageResponse = {
        bondingCurveProgress: Number(bcprogress),
        marketCap: mc,
        coinAddress: data.token,
        athProgress,
        currentPrice: currentPrice.toString(),
        // @ts-ignore
        athPrice: athPrice.ATHPrice
    }

    return message;
}



function getDataChange(){
    
}



