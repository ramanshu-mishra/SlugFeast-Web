export enum EventType{
     tokenGraduated = "tokenGraduated",
}

export enum TransactionEvents{
    tokenBought = "tokenBought",
     tokenSold = "tokenSold",
}

export enum ActionEnum {
    SUBSCRIBE   = "SUBSCRIBE",
    UNSUBSCRIBE = "UNSUBSCRIBE",
    SUBSCRIBE_ALL = "SUBSCRIBE_ALL",
    UNSUBSCRIBE_ALL = "UNSUBSCRIBE_ALL"
}

export const CombinedInterface = {
    ...EventType, ...TransactionEvents
}
