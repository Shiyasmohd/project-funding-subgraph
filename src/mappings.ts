import { BigInt } from "@graphprotocol/graph-ts";
import { newFundingCreated, } from "../generated/FundingFactory/FundingFactory";
import { fundsWithdrawn, projectListed, resultPublished, voted, FundingContract as FundingEventContract } from "../generated/templates/FundingContract/FundingContract";
import { EventCreator, Project, FundingEvent, User, Vote, UserFundingEvent } from "../generated/schema";
import { IpfsMetadataDetails, FundingContract } from "../generated/templates";

export function handleNewFundingCreated(event: newFundingCreated): void {

  let fundingEvent = FundingEvent.load(event.params.cloneAddress.toHexString());
  let eventCreator = EventCreator.load(event.params.owner.toHexString())

  if (fundingEvent == null) {

    fundingEvent = new FundingEvent(event.params.cloneAddress.toHexString());

    let ipfsHash = event.params.eventCID + "/data.json"
    fundingEvent.eventDetails = ipfsHash
    IpfsMetadataDetails.create(ipfsHash)

    fundingEvent.prizePool = event.params.prizePool;
    fundingEvent.eventCID = ipfsHash;
    fundingEvent.status = "Active"
    fundingEvent.owner = event.params.owner.toHexString()

  }
  if (eventCreator == null) {
    eventCreator = new EventCreator(event.params.owner.toHexString())
  }


  FundingContract.create(event.params.cloneAddress)
  fundingEvent.save()
  eventCreator.save()

}

export function handleProjectListed(event: projectListed): void {

  let project = Project.load(event.params.projectId.toHexString())
  let user = User.load(event.params.owner.toHexString())

  if (user == null) {

    user = new User(event.params.owner.toHexString())

    user.earnings = BigInt.fromString("0")
    user.votesLeft = BigInt.fromString("100")

    user.save()

  }
  if (project == null) {

    project = new Project(event.params.projectId.toHexString())

    let ipfsHash = event.params.projectCID + "/data.json"
    project.projectDetails = ipfsHash
    IpfsMetadataDetails.create(ipfsHash);

    project.owner = event.params.owner.toHexString()
    project.projectCID = event.params.projectCID
    project.amountWon = BigInt.fromString("0")
    project.event = event.transaction.to!.toHexString()
    project.amountWithdrawn = false

    project.save()

  }

  let userFundingEvent = UserFundingEvent.load(event.transaction.to!.toHexString() + "-" + event.params.owner.toHexString())

  if (userFundingEvent == null) {
    userFundingEvent = new UserFundingEvent(event.transaction.to!.toHexString() + "-" + event.params.owner.toHexString())
    userFundingEvent.user = event.params.owner.toHexString()
    userFundingEvent.event = event.transaction.to!.toHexString()
    userFundingEvent.save()
  }
}

export function handleVoted(event: voted): void {

  let vote = new Vote(event.transaction.hash.toHexString())

  vote.project = event.params.projectId.toHexString()
  vote.voteCount = event.params.voteCount
  vote.user = event.params.user.toHexString()

  vote.save()

  let user = User.load(event.params.user.toHexString())

  if (user) {
    user.votesLeft = user.votesLeft.minus(event.params.voteCount)
    user.save()
  }
}

export function handleFundsWithdrawn(event: fundsWithdrawn): void {

  let project = Project.load(event.params.projectId.toHexString())

  if (project) {
    project.amountWithdrawn = true
    project.save()
  }

  let user = User.load(event.params.owner.toHexString())

  if (user) {
    user.earnings = user.earnings.plus(event.params.amount)
    user.save()
  }

}

export function handleResultPublished(event: resultPublished): void {

  let counter = 0
  let eventContract = FundingEventContract.bind(event.address)

  for (counter = 1; counter <= event.params.totalProjects.toI64(); counter++) {
    let project = Project.load(BigInt.fromI64(counter).toHexString())
    if (project) {
      project.amountWon = eventContract.getProjectById(BigInt.fromU64(counter)).amountWon
      project.save()
    }
  }

  let fundingEvent = FundingEvent.load(event.address.toHexString())

  if (fundingEvent) {
    fundingEvent.status = "Ended"
    fundingEvent.save()
  }

}
