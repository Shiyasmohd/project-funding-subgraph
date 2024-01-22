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