export enum EventType{
     "tokenGraduated" = "tokenGraduated",
     "tokenCreated" = "tokenCreated"
}

export enum TransactionEvents{
    "tokenBought" = "tokenBought",
     "tokenSold" = "tokenSold",
}

export enum ActionEnum {
    SUBSCRIBE   = "SUBSCRIBE",
    UNSUBSCRIBE = "UNSUBSCRIBE",
    SUBSCRIBE_ALL = "SUBSCRIBE_ALL",
    UNSUBSCRIBE_ALL = "UNSUBSCRIBE_ALL"
}

const Events = {
    ...ActionEnum,
    ...EventType
}

export type EventTypes = keyof typeof Events;