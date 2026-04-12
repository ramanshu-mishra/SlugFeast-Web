import { prisma } from "@repo/database/client";
import { QueueData } from "../interfaces/queueData";
import {client} from "../server";
import Big from "big.js";

const REDIS_ATH_KEY = process.env.REDIS_ATH_KEY || "ATHPrice";

export async function updateCoinPool(data: Map<string, string>): Promise<void> {
    if (data.size === 0) {
        return;
    }

    const entries = Array.from(data.values()).map((value) => JSON.parse(value) as QueueData);

    await prisma.$transaction(async (tx) => {
        for (const parsed of entries) {
            const currentPrice = getPrice(parsed.poolTokens, parsed.poolVETHs);  // in weith
                const parsedTimestamp = Number(parsed.blockTimeStamp);
                const normalizedTimestamp = Number.isFinite(parsedTimestamp)
                    ? Math.floor(parsedTimestamp).toString()
                    : Math.floor(Date.now() / 1000).toString();

            const coin = await tx.coin.findUnique({
                where: {
                    address: parsed.coinAddress,
                },
                select: {
                    // @ts-ignore
                    ATHPrice: true,
                },
            });

            const existingAthPrice = new Big(String((coin as any)?.ATHPrice ?? "0"));
            const nextAthPrice = existingAthPrice.gt(currentPrice)
                ? existingAthPrice
                : currentPrice;

            await tx.coin.update({
                where: {
                    address: parsed.coinAddress,
                },
                data: {
                    TokenAmount: parsed.poolTokens.toString(),
                    VETHAmount: parsed.poolVETHs.toString(),
                    ATHPrice: nextAthPrice.toString(),
                    // @ts-ignore
                    lastTimeStamp: normalizedTimestamp
                } as any,
            });

            await client.hSet(REDIS_ATH_KEY, parsed.coinAddress, nextAthPrice.toString()); //setting the athprice to be accessed by token-rpc-wss
            console.log(`${REDIS_ATH_KEY} updated `, parsed.coinAddress , " athPrice : ", nextAthPrice.toString());
        }
    });
}

function getPrice(tokenInPool: string | number | bigint, VETHinPool: string | number | bigint){
    let token: Big;
    let veth: Big;

    try {
        token = new Big(String(tokenInPool));
        veth = new Big(String(VETHinPool));
    } catch {
        return new Big(0);
    }

    if (token.lte(0) || veth.lt(0)) {
        return new Big(0);
    }

    return veth.div(token).times(10**6).round(0, Big.roundHalfUp); // formula  to get price in weith
}