export interface StoredMessageImage {
    id: string;
    address: string;
    messageId: string;
}

export interface StoredReferencedMessage {
    id: string;
    message: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId: string | null;
    dateTime: string;
}

export interface StoredMessage {
    id: string;
    message: string | null;
    userKey: string;
    coinId: string;
    referencedMessageId: string | null;
    dateTime: string;
    referencedImage: StoredMessageImage | null;
    referencedMessage: StoredReferencedMessage | null;
}

export interface messageResponse {
    success: boolean;
    event?: "message_created";
    data?: StoredMessage;
    message?: string;
    statusCode?: number;
}


export interface MessageResponse_TokenData{
    bondingCurveProgress: Number,
    marketCap: string,
    marketCap_usd: string,
    currentPrice: string,
    currentPrice_usd: string,
    athPrice: string,
    athPrice_usd:string,
    athProgress: string,
    athCap:string,
    athCap_usd: string,
    coinAddress: `0x${string}`

    change_5min?: Number,
    change_15min?: Number,
    change_30min?: Number,
    change_1h?: Number,
    change_1D?: Number,
    change_5D?: Number,
    change_1M?: Number,
    change_1Y?: Number
}



export interface polledData{
    token: `0x${string}`,
    VETH: BigInt,
    amount: BigInt,
    sender: `0x${string}`,
    poolTokens: BigInt,
    poolVETHs: BigInt,
    blockNumber:  string,
    txHash: BigInt,
    internal_id: string,
    blockTimestamp: string
}

export interface QueueData {
  event: "buy" | "sell";
  coinAddress: `0x${string}`;
  poolTokens: Number;
  poolVETHs: Number;
  blockTimeStamp: string,
}



export interface rawData{
     token: `0x${string}`,
     poolTokens: BigInt,
     poolVETHs: BigInt,
}



export interface TradeEvent{
event : "TradeEvent",
coinAddress: `0x${string}`,
data: TradePoint
}

export interface TradePoint {
    timestamp: number;
    marketCapEth: number;
    marketCapUsdt: number;
    volume: number;
    amountInToken: number;
    amountInEth:number,
    txnHash: string,
    blockTimestamp: string
}  