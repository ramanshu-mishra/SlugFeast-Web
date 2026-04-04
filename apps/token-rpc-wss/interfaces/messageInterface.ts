import { EventTypes } from "./eventsInterface"
export interface MessageResponse{
    marketCap: string,
    bondingCurveProgress: Number,
    coinAddress: `0x${string}`,
    change_5min: Number,
    change_15min: Number,
    change_30min: Number,
    change_1h: Number,
    change_1D: Number,
    change_5D: Number,
    change_1M: Number,
    change_1Y: Number
}