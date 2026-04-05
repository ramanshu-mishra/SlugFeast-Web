import { polledData } from "../interfaces/messageInterface";
import { QueueData } from "../interfaces/messageInterface"; 

export function parseRedisEvent(data: polledData, event: "buy"|"sell"): QueueData{
    const parsedEvent: QueueData = {
        event,
        coinAddress: data.token,
        poolTokens: Number(data.poolTokens),
        poolVETHs: Number(data.poolVETHs),
        blockTimeStamp: data.blockTimeStamp
    }
    return parsedEvent;
}