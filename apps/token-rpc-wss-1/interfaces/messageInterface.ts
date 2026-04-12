
export interface MessageResponse{
    bondingCurveProgress: Number,
    marketCap: string,
    marketCap_usd:string,
    currentPrice: string,
    currentPrice_usd: string,
    athPrice: string,
    athPrice_usd:string,
    athProgress: string,

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

export interface rawData{
     token: `0x${string}`,
     poolTokens: BigInt,
     poolVETHs: BigInt,
}

export interface QueueData {
  event: "buy" | "sell";
  coinAddress: `0x${string}`;
  poolTokens: Number;
  poolVETHs: Number;
  blockTimeStamp: string,
}