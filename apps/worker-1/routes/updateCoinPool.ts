import { prisma } from "@repo/database/client";
import { QueueData } from "../interfaces/queueData";
import {client} from "../server";

const REDIS_ATH_KEY = process.env.REDIS_ATH_KEY || "ATHPrice";

export async function updateCoinPool(data: Map<string, string>): Promise<void> {
    if (data.size === 0) {
        return;
    }

    const entries = Array.from(data.values()).map((value) => JSON.parse(value) as QueueData);

    await prisma.$transaction(async (tx) => {
        for (const parsed of entries) {
            const currentPrice = getPrice(Number(parsed.poolTokens), Number(parsed.poolVETHs));
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

            const existingAthPrice = Number((coin as any)?.ATHPrice ?? 0);
            const nextAthPrice = Math.max(existingAthPrice, currentPrice);

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
            console.log(`${REDIS_ATH_KEY} updated`);
        }
    });
}

function getPrice(tokenInPool: Number, VETHinPool: Number){
    const token = Number(tokenInPool);
    const veth = Number(VETHinPool);

    if (!Number.isFinite(token) || !Number.isFinite(veth) || token <= 0) {
        return 0;
    }

    const price = (veth / token) / 10 ** 12;
    return Number.isFinite(price) ? price : 0;
}