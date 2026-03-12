// ─── Types ─────────────────────────────────────────────────────────────────
export interface TokenBoughtEvent {
    id: string;
    token: string;
    VETH: string;
    amount: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}

export interface TokenSoldEvent {
    id: string;
    token: string;
    VETH: string;
    amount: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}

export interface TokenCreatedEvent {
    id: string;
    token: string;
    internal_id: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}

export interface TokenDeployedEvent {
    id: string;
    token: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}

export interface TokenGraduatedEvent {
    id: string;
    token: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}

export interface PoolCreatedEvent {
    id: string;
    tokenA: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
}


