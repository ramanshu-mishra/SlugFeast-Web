export type ChangeKey =
    | "change_5min"
    | "change_15min"
    | "change_30min"
    | "change_1h"
    | "change_1D"
    | "change_5D"
    | "change_1M"
    | "change_1Y";

export const CHANGE_WINDOWS: Array<{ key: ChangeKey; seconds: number }> = [
    { key: "change_5min", seconds: 5 * 60 },
    { key: "change_15min", seconds: 15 * 60 },
    { key: "change_30min", seconds: 30 * 60 },
    { key: "change_1h", seconds: 60 * 60 },
    { key: "change_1D", seconds: 24 * 60 * 60 },
    { key: "change_5D", seconds: 5 * 24 * 60 * 60 },
    { key: "change_1M", seconds: 30 * 24 * 60 * 60 },
    { key: "change_1Y", seconds: 365 * 24 * 60 * 60 },
];