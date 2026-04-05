import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  TokenBought,
  TokenCreated,
  TokenSold,
  poolcreated,
  tokenDeployed,
  tokenGraduated
} from "../generated/SlugDex/SlugDex"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokenBoughtEvent(
  token: Address,
  VETH: BigInt,
  amount: BigInt,
  sender: Address,
  poolTokens: BigInt,
  poolVETHs: BigInt
): TokenBought {
  let tokenBoughtEvent = changetype<TokenBought>(newMockEvent())

  tokenBoughtEvent.parameters = new Array()

  tokenBoughtEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenBoughtEvent.parameters.push(
    new ethereum.EventParam("VETH", ethereum.Value.fromUnsignedBigInt(VETH))
  )
  tokenBoughtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tokenBoughtEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  tokenBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "poolTokens",
      ethereum.Value.fromUnsignedBigInt(poolTokens)
    )
  )
  tokenBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "poolVETHs",
      ethereum.Value.fromUnsignedBigInt(poolVETHs)
    )
  )

  return tokenBoughtEvent
}

export function createTokenCreatedEvent(
  token: Address,
  id: string,
  poolTokens: BigInt,
  poolVETHs: BigInt
): TokenCreated {
  let tokenCreatedEvent = changetype<TokenCreated>(newMockEvent())

  tokenCreatedEvent.parameters = new Array()

  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromString(id))
  )
  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "poolTokens",
      ethereum.Value.fromUnsignedBigInt(poolTokens)
    )
  )
  tokenCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "poolVETHs",
      ethereum.Value.fromUnsignedBigInt(poolVETHs)
    )
  )

  return tokenCreatedEvent
}

export function createTokenSoldEvent(
  token: Address,
  VETH: BigInt,
  amount: BigInt,
  sender: Address,
  poolTokens: BigInt,
  poolVETHs: BigInt
): TokenSold {
  let tokenSoldEvent = changetype<TokenSold>(newMockEvent())

  tokenSoldEvent.parameters = new Array()

  tokenSoldEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  tokenSoldEvent.parameters.push(
    new ethereum.EventParam("VETH", ethereum.Value.fromUnsignedBigInt(VETH))
  )
  tokenSoldEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tokenSoldEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  tokenSoldEvent.parameters.push(
    new ethereum.EventParam(
      "poolTokens",
      ethereum.Value.fromUnsignedBigInt(poolTokens)
    )
  )
  tokenSoldEvent.parameters.push(
    new ethereum.EventParam(
      "poolVETHs",
      ethereum.Value.fromUnsignedBigInt(poolVETHs)
    )
  )

  return tokenSoldEvent
}

export function createpoolcreatedEvent(
  tokenA: Address,
  poolTokens: BigInt,
  poolVETHs: BigInt
): poolcreated {
  let poolcreatedEvent = changetype<poolcreated>(newMockEvent())

  poolcreatedEvent.parameters = new Array()

  poolcreatedEvent.parameters.push(
    new ethereum.EventParam("tokenA", ethereum.Value.fromAddress(tokenA))
  )
  poolcreatedEvent.parameters.push(
    new ethereum.EventParam(
      "poolTokens",
      ethereum.Value.fromUnsignedBigInt(poolTokens)
    )
  )
  poolcreatedEvent.parameters.push(
    new ethereum.EventParam(
      "poolVETHs",
      ethereum.Value.fromUnsignedBigInt(poolVETHs)
    )
  )

  return poolcreatedEvent
}

export function createtokenDeployedEvent(token: Address): tokenDeployed {
  let tokenDeployedEvent = changetype<tokenDeployed>(newMockEvent())

  tokenDeployedEvent.parameters = new Array()

  tokenDeployedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenDeployedEvent
}

export function createtokenGraduatedEvent(token: Address): tokenGraduated {
  let tokenGraduatedEvent = changetype<tokenGraduated>(newMockEvent())

  tokenGraduatedEvent.parameters = new Array()

  tokenGraduatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return tokenGraduatedEvent
}
