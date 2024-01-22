// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class fundsWithdrawn extends ethereum.Event {
  get params(): fundsWithdrawn__Params {
    return new fundsWithdrawn__Params(this);
  }
}

export class fundsWithdrawn__Params {
  _event: fundsWithdrawn;

  constructor(event: fundsWithdrawn) {
    this._event = event;
  }

  get projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get date(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class projectListed extends ethereum.Event {
  get params(): projectListed__Params {
    return new projectListed__Params(this);
  }
}

export class projectListed__Params {
  _event: projectListed;

  constructor(event: projectListed) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get projectCID(): string {
    return this._event.parameters[1].value.toString();
  }

  get projectId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class resultPublished extends ethereum.Event {
  get params(): resultPublished__Params {
    return new resultPublished__Params(this);
  }
}

export class resultPublished__Params {
  _event: resultPublished;

  constructor(event: resultPublished) {
    this._event = event;
  }

  get dateEnded(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get totalProjects(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class voted extends ethereum.Event {
  get params(): voted__Params {
    return new voted__Params(this);
  }
}

export class voted__Params {
  _event: voted;

  constructor(event: voted) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get voteCount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get projectId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class FundingContract__getProjectByIdResultValue0Struct extends ethereum.Tuple {
  get projectId(): BigInt {
    return this[0].toBigInt();
  }

  get projectOwner(): Address {
    return this[1].toAddress();
  }

  get projectCID(): string {
    return this[2].toString();
  }

  get isWithdrawnFund(): boolean {
    return this[3].toBoolean();
  }

  get amountWon(): BigInt {
    return this[4].toBigInt();
  }

  get totalVotes(): BigInt {
    return this[5].toBigInt();
  }

  get votes(): Array<FundingContract__getProjectByIdResultValue0VotesStruct> {
    return this[6].toTupleArray<
      FundingContract__getProjectByIdResultValue0VotesStruct
    >();
  }
}

export class FundingContract__getProjectByIdResultValue0VotesStruct extends ethereum.Tuple {
  get userAddress(): Address {
    return this[0].toAddress();
  }

  get voteCount(): BigInt {
    return this[1].toBigInt();
  }
}

export class FundingContract__getUserByAddressResultValue0Struct extends ethereum.Tuple {
  get userAddress(): Address {
    return this[0].toAddress();
  }

  get projects(): Array<
    FundingContract__getUserByAddressResultValue0ProjectsStruct
  > {
    return this[1].toTupleArray<
      FundingContract__getUserByAddressResultValue0ProjectsStruct
    >();
  }

  get votesLeft(): BigInt {
    return this[2].toBigInt();
  }
}

export class FundingContract__getUserByAddressResultValue0ProjectsStruct extends ethereum.Tuple {
  get projectId(): BigInt {
    return this[0].toBigInt();
  }

  get projectOwner(): Address {
    return this[1].toAddress();
  }

  get projectCID(): string {
    return this[2].toString();
  }

  get isWithdrawnFund(): boolean {
    return this[3].toBoolean();
  }

  get amountWon(): BigInt {
    return this[4].toBigInt();
  }

  get totalVotes(): BigInt {
    return this[5].toBigInt();
  }

  get votes(): Array<
    FundingContract__getUserByAddressResultValue0ProjectsVotesStruct
  > {
    return this[6].toTupleArray<
      FundingContract__getUserByAddressResultValue0ProjectsVotesStruct
    >();
  }
}

export class FundingContract__getUserByAddressResultValue0ProjectsVotesStruct extends ethereum.Tuple {
  get userAddress(): Address {
    return this[0].toAddress();
  }

  get voteCount(): BigInt {
    return this[1].toBigInt();
  }
}

export class FundingContract__projectsResult {
  value0: BigInt;
  value1: Address;
  value2: string;
  value3: boolean;
  value4: BigInt;
  value5: BigInt;

  constructor(
    value0: BigInt,
    value1: Address,
    value2: string,
    value3: boolean,
    value4: BigInt,
    value5: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromBoolean(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    return map;
  }

  getProjectId(): BigInt {
    return this.value0;
  }

  getProjectOwner(): Address {
    return this.value1;
  }

  getProjectCID(): string {
    return this.value2;
  }

  getIsWithdrawnFund(): boolean {
    return this.value3;
  }

  getAmountWon(): BigInt {
    return this.value4;
  }

  getTotalVotes(): BigInt {
    return this.value5;
  }
}

export class FundingContract__usersResult {
  value0: Address;
  value1: BigInt;

  constructor(value0: Address, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getUserAddress(): Address {
    return this.value0;
  }

  getVotesLeft(): BigInt {
    return this.value1;
  }
}

export class FundingContract extends ethereum.SmartContract {
  static bind(address: Address): FundingContract {
    return new FundingContract("FundingContract", address);
  }

  etherBalance(): BigInt {
    let result = super.call("etherBalance", "etherBalance():(uint256)", []);

    return result[0].toBigInt();
  }

  try_etherBalance(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("etherBalance", "etherBalance():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  eventCId(): string {
    let result = super.call("eventCId", "eventCId():(string)", []);

    return result[0].toString();
  }

  try_eventCId(): ethereum.CallResult<string> {
    let result = super.tryCall("eventCId", "eventCId():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  eventEndTime(): BigInt {
    let result = super.call("eventEndTime", "eventEndTime():(uint256)", []);

    return result[0].toBigInt();
  }

  try_eventEndTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("eventEndTime", "eventEndTime():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  eventOwner(): Address {
    let result = super.call("eventOwner", "eventOwner():(address)", []);

    return result[0].toAddress();
  }

  try_eventOwner(): ethereum.CallResult<Address> {
    let result = super.tryCall("eventOwner", "eventOwner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getProjectById(
    _projectId: BigInt
  ): FundingContract__getProjectByIdResultValue0Struct {
    let result = super.call(
      "getProjectById",
      "getProjectById(uint256):((uint256,address,string,bool,uint256,uint256,(address,uint256)[]))",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return changetype<FundingContract__getProjectByIdResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getProjectById(
    _projectId: BigInt
  ): ethereum.CallResult<FundingContract__getProjectByIdResultValue0Struct> {
    let result = super.tryCall(
      "getProjectById",
      "getProjectById(uint256):((uint256,address,string,bool,uint256,uint256,(address,uint256)[]))",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<FundingContract__getProjectByIdResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getUserByAddress(
    _userAddress: Address
  ): FundingContract__getUserByAddressResultValue0Struct {
    let result = super.call(
      "getUserByAddress",
      "getUserByAddress(address):((address,(uint256,address,string,bool,uint256,uint256,(address,uint256)[])[],uint256))",
      [ethereum.Value.fromAddress(_userAddress)]
    );

    return changetype<FundingContract__getUserByAddressResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getUserByAddress(
    _userAddress: Address
  ): ethereum.CallResult<FundingContract__getUserByAddressResultValue0Struct> {
    let result = super.tryCall(
      "getUserByAddress",
      "getUserByAddress(address):((address,(uint256,address,string,bool,uint256,uint256,(address,uint256)[])[],uint256))",
      [ethereum.Value.fromAddress(_userAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<FundingContract__getUserByAddressResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  prizePool(): BigInt {
    let result = super.call("prizePool", "prizePool():(uint256)", []);

    return result[0].toBigInt();
  }

  try_prizePool(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("prizePool", "prizePool():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  projects(param0: BigInt): FundingContract__projectsResult {
    let result = super.call(
      "projects",
      "projects(uint256):(uint256,address,string,bool,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new FundingContract__projectsResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toString(),
      result[3].toBoolean(),
      result[4].toBigInt(),
      result[5].toBigInt()
    );
  }

  try_projects(
    param0: BigInt
  ): ethereum.CallResult<FundingContract__projectsResult> {
    let result = super.tryCall(
      "projects",
      "projects(uint256):(uint256,address,string,bool,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new FundingContract__projectsResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toString(),
        value[3].toBoolean(),
        value[4].toBigInt(),
        value[5].toBigInt()
      )
    );
  }

  startTime(): BigInt {
    let result = super.call("startTime", "startTime():(uint256)", []);

    return result[0].toBigInt();
  }

  try_startTime(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("startTime", "startTime():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  users(param0: Address): FundingContract__usersResult {
    let result = super.call("users", "users(address):(address,uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return new FundingContract__usersResult(
      result[0].toAddress(),
      result[1].toBigInt()
    );
  }

  try_users(
    param0: Address
  ): ethereum.CallResult<FundingContract__usersResult> {
    let result = super.tryCall("users", "users(address):(address,uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new FundingContract__usersResult(
        value[0].toAddress(),
        value[1].toBigInt()
      )
    );
  }
}

export class CreatNewProjectCall extends ethereum.Call {
  get inputs(): CreatNewProjectCall__Inputs {
    return new CreatNewProjectCall__Inputs(this);
  }

  get outputs(): CreatNewProjectCall__Outputs {
    return new CreatNewProjectCall__Outputs(this);
  }
}

export class CreatNewProjectCall__Inputs {
  _call: CreatNewProjectCall;

  constructor(call: CreatNewProjectCall) {
    this._call = call;
  }

  get _projectCID(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class CreatNewProjectCall__Outputs {
  _call: CreatNewProjectCall;

  constructor(call: CreatNewProjectCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _eventCId(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _prizePool(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _duration(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MakeVoteCall extends ethereum.Call {
  get inputs(): MakeVoteCall__Inputs {
    return new MakeVoteCall__Inputs(this);
  }

  get outputs(): MakeVoteCall__Outputs {
    return new MakeVoteCall__Outputs(this);
  }
}

export class MakeVoteCall__Inputs {
  _call: MakeVoteCall;

  constructor(call: MakeVoteCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _voteCount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class MakeVoteCall__Outputs {
  _call: MakeVoteCall;

  constructor(call: MakeVoteCall) {
    this._call = call;
  }
}

export class PublisResultCall extends ethereum.Call {
  get inputs(): PublisResultCall__Inputs {
    return new PublisResultCall__Inputs(this);
  }

  get outputs(): PublisResultCall__Outputs {
    return new PublisResultCall__Outputs(this);
  }
}

export class PublisResultCall__Inputs {
  _call: PublisResultCall;

  constructor(call: PublisResultCall) {
    this._call = call;
  }
}

export class PublisResultCall__Outputs {
  _call: PublisResultCall;

  constructor(call: PublisResultCall) {
    this._call = call;
  }
}

export class WithdrawFundsCall extends ethereum.Call {
  get inputs(): WithdrawFundsCall__Inputs {
    return new WithdrawFundsCall__Inputs(this);
  }

  get outputs(): WithdrawFundsCall__Outputs {
    return new WithdrawFundsCall__Outputs(this);
  }
}

export class WithdrawFundsCall__Inputs {
  _call: WithdrawFundsCall;

  constructor(call: WithdrawFundsCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawFundsCall__Outputs {
  _call: WithdrawFundsCall;

  constructor(call: WithdrawFundsCall) {
    this._call = call;
  }
}
