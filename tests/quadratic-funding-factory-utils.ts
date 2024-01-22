import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  newQuadraticFundingCreated
} from "../generated/QuadraticFundingFactory/QuadraticFundingFactory"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

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

export function createnewQuadraticFundingCreatedEvent(
  owner: Address,
  prizePool: BigInt,
  cloneAddress: Address,
  eventCID: string
): newQuadraticFundingCreated {
  let newQuadraticFundingCreatedEvent = changetype<newQuadraticFundingCreated>(
    newMockEvent()
  )

  newQuadraticFundingCreatedEvent.parameters = new Array()

  newQuadraticFundingCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  newQuadraticFundingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "prizePool",
      ethereum.Value.fromUnsignedBigInt(prizePool)
    )
  )
  newQuadraticFundingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "cloneAddress",
      ethereum.Value.fromAddress(cloneAddress)
    )
  )
  newQuadraticFundingCreatedEvent.parameters.push(
    new ethereum.EventParam("eventCID", ethereum.Value.fromString(eventCID))
  )

  return newQuadraticFundingCreatedEvent
}
