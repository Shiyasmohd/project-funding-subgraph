<div align="center" style="font-family:'Montserrat', sans-serif;">

## 💰 Project Funding Contract Subgraph 

[![Link](https://img.shields.io/badge/GraphQL-Link-yellow)](https://api.studio.thegraph.com/query/47004/funding-sepolia/version/latest) <br/>
</div>

## 📝 Project Description 

This is a project where **Organizations** can create an event with a prize pool. The prize will be distributed to the projects listed under it within a specific time period. **Users** can list their projects and enter the competition. Each user (those who have listed their projects under the competition) will receive 100 votes, which can be distributed to other listed projects, with the condition that they cannot vote for their own project. After the voting period ends, the organization publishes the results, and users can withdraw the amount they won based on the received votes.

## ⚙️ Features Used in Subgraph

- Reverse Lookups⁠
- Data Source Templates for Dynamically Created Contracts
- File Data Sources

<div align="center" style="font-family:'Montserrat', sans-serif;">

## 📜 Smart Contract

</div>

I have created custom smart contracts for this project and it consists of 2 contracts. One implementaion contract `FundingContract.sol` and one Factory contract `FundingFactory.sol` which deploys new `FundingContract.sol` contract. Both contracts are in folder `contracts` in this repository.

> Note: The Project and Event details (name,description,link) are stored on IPFS and IPFS CID is strored on contract instead to storing all variables.

| Contract      | Address | Explorer Link |
| ----------- | ----------- | ----------- |
| FundingFactory     |  0x151D0545647B710Cb7B16D33f9c9CBb2dE3553Cf       | [Link](https://sepolia.etherscan.io/address/0x151D0545647B710Cb7B16D33f9c9CBb2dE3553Cf)
| FundingContract   | 0xD0ddBe3c8C5D3Baa122D1317723cdD37ED313e18        | [Link](https://sepolia.etherscan.io/address/0xD0ddBe3c8C5D3Baa122D1317723cdD37ED313e18)

> Contracts are deployed on Sepolia Testnet.

### 🎯 Events 

There are total 5 events emitted.

1. When an Organization is creating a new event. (A new contract will be deployed from Factory Contract)
```
event newFundingCreated(address indexed owner, uint256 prizePool, address cloneAddress, string eventCID);
```

2. When a new project is listed for an event(competition)
```
event projectListed(address indexed owner, string projectCID, uint256 projectId);
```

3. When a user votes for a project
```
event voted(address indexed user, uint256 voteCount, uint256 projectId);
```

4. When the organization publishes result
```
event resultPublished(uint256 dateEnded,uint256 totalProjects);
```

5. When a user withdraw the funds won from a project
```
event fundsWithdrawn(uint256 indexed projectId, uint256 amount, uint256 date, address owner);
```
<div align="center" style="font-family:'Montserrat', sans-serif;">

## 🛠 Subgraph 

</div>

### 📦 Schema 

Enums used

```
enum EventStatus{
  Active
  Ended
}
```

Total 7 Entities are defined in `schema.graphql`

 1. Event Creator Details
 ```
 type EventCreator @entity {
  id: ID!  # Wallet Address of Event Creator
  createdEvents: [FundingEvent!] @derivedFrom(field: "owner")
}
 ```

 2. User Details
 ```
type User @entity {
  id: ID! # User Wallet Address
  participatedEvents: [UserFundingEvent!] @derivedFrom(field: "user")
  projects: [Project!] @derivedFrom(field: "owner")
  votesLeft: BigInt!
  completedVotes: [Vote!] @derivedFrom(field: "user")
  earnings: BigInt!
}
 ```

3. Event/Competition Details
```
type FundingEvent @entity {
  id: ID! # Implementation Contract Address
  eventCID: String! 
  eventDetails: IpfsMetadataDetails
  owner: EventCreator! 
  status: EventStatus
  prizePool: BigInt!
  users: [UserFundingEvent!] @derivedFrom(field: "event") 
  projects: [Project!] @derivedFrom(field: "event")
}
```
4. 
```
type UserFundingEvent @entity {
  id: ID!
  user: User!
  event: FundingEvent!
}
```
5. Listed Project Details
```
type Project @entity {
  id: ID! # Project ID
  owner: User!
  event: FundingEvent! 
  projectCID: String! 
  projectDetails: IpfsMetadataDetails
  amountWon: BigInt! 
  amountWithdrawn: Boolean!
  votes: [Vote!] @derivedFrom(field: "project")
}
```
6. Vote Details
```
type Vote @entity {
  id: ID! # Transaction Hash
  project: Project! 
  user: User!
  voteCount: BigInt! 
}
```
7. Project/Event IPFS Metadata Details (Used File Data Source to Index)
```
type IpfsMetadataDetails @entity {
  id: ID! # IPFS URI
  name: String!
  description: String!
  link: String!
}
```

### 📌 Event Handlers

1. Data Source (Events from factory contract) - Event handlers are defined in `src/mappings.ts`
```
- event: newFundingCreated(indexed address,uint256,address,string)
    handler: handleNewFundingCreated 
```

2. Templates (Events from implementation contract) - Event handlers are defined in `src/mappings.ts`
```
- event: projectListed(indexed address,string,uint256)
    handler: handleProjectListed
- event: voted(indexed address,uint256,uint256)
    handler: handleVoted
- event: fundsWithdrawn(indexed uint256,uint256,uint256,address)
    handler: handleFundsWithdrawn
- event: resultPublished(uint256,uint256)
    handler: handleResultPublished
```
3. File Data Source (To index metadata for Event & Project details) - Defined in `src/map-ipfs.ts`
```
import { Bytes, dataSource, json } from "@graphprotocol/graph-ts";
import { IpfsMetadataDetails } from "../generated/schema";

export function handleMetadata(content: Bytes): void {

    let ipfsData = new IpfsMetadataDetails(dataSource.stringParam())
    const val = json.fromBytes(content).toObject()

    const name = val.get("name")!.toString()
    const description = val.get("description")!.toString()
    const link = val.get("link")!.toString()

    ipfsData.description = description
    ipfsData.name = name
    ipfsData.link = link
    ipfsData.save()

}
```

## 📋 Summary

- Created a custom **Factory contract & Implementation contract** for Project Funding and deployed to `Sepolia Testnet`
- Defined Schema in the most optimized form using **Reverse Lookups**
- Configured event handlers in `subgraph.yaml` for Factory Contract(Data Source) & Implementation Contract(Templates)
- Defined event handlers in `src/mappings.ts` and deployed subgraph to `Subgraph Studio`
- Used **File Data Source** to index metadata from **IPFS** - `src/map-ipfs.ts`

Subgraph URL - [Link](https://api.studio.thegraph.com/query/47004/funding-sepolia/version/latest)

### 📊 Sample Queries

- Events(Competition) created by all event creators - [Link](https://api.studio.thegraph.com/proxy/47004/funding-sepolia/version/latest/graphql?query=%7B%0A++eventCreators%7B%0A+++++id%0A++++createdEvents%7B%0A++++++id%0A++++++prizePool%0A++++++eventDetails%7B%0A++++++++name%0A++++++%7D%0A++++%7D%0A++%7D%0A%7D)
- User and Project submitted for all Events(Many-to-Many Relation) - [Link](https://api.studio.thegraph.com/proxy/47004/funding-sepolia/version/latest/graphql?query=%7B%0A++fundingEvents+%7B%0A++++prizePool%0A++++status%0A++++users+%7B%0A++++++user+%7B%0A++++++++earnings%0A++++++++projects+%7B%0A++++++++++amountWon%0A++++++++++amountWithdrawn%0A++++++++%7D%0A++++++%7D%0A++++%7D%0A++%7D%0A%7D)
- Event Details & Submitted Projects Details (Indexed using File Data Source) - [Link](https://api.studio.thegraph.com/proxy/47004/funding-sepolia/version/latest/graphql?query=%7B%0A++fundingEvents%7B%0A++++eventDetails%7B%0A++++++name%0A++++++description%0A++++++link%0A++++%7D%0A++%7D%0A++projects%7B%0A++++projectCID%0A++++projectDetails%7B%0A++++++name%0A++++++description%0A++++++link%0A++++%7D%0A++%7D%0A%7D)

## 📩 Contact

If anymore details required, feel free to contact `shiyasmohd.official@gmail.com`