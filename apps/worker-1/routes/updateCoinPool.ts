import { prisma } from "@repo/database/client";
import { QueueData } from "../interfaces/queueData";

export async function updateCoinPool(data: Map<string, string>): Promise<void> {
    if (data.size === 0) {
        return;
    }

    const updates = Array.from(data.values()).map((value) => {
        const parsed = JSON.parse(value) as QueueData;

        return prisma.coin.updateMany({
            where: {
                address: parsed.coinAddress,
            },
            data: {
                TokenAmount: parsed.poolTokens.toString(),
                VETHAmount: parsed.poolVETHs.toString(),
            } as any,
        });
    });

    await prisma.$transaction(updates);
}
