export interface QueueData {
  event: "buy" | "sell";
  coinAddress: `0x${string}`;
  poolTokens: bigint;
  poolVETHs: bigint;
  blockTimeStamp: string,
  lastId: string
}
