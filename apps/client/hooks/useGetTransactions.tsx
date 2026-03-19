"use clinet"

interface PeriodInterface {
    start: string;
    end: string;
}

interface Transaction {
    token: string;
    VETH: string;
    amount: string;
    blockTimestamp: string;
}

interface OHLCCandle {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

async function getTransactions(token: `0x${string}`, period: PeriodInterface){
    const res = await 
}

export function useGetTransactions(){
    
}