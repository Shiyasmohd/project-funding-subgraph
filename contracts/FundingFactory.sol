//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FundingContract.sol";

contract FundingFactory is Ownable {
    
    address immutable fundingImplementation;
    address[] public _deployedContracts;

    event newFundingCreated( address indexed owner, uint256 prizePool, address cloneAddress, string eventCID);

    constructor(address _implementation) Ownable(msg.sender) {
        fundingImplementation = _implementation;
    }

    function createFundingContract(
        string memory _eventCId,
        uint256 _prizePool,
        uint256 _duration
    ) external payable returns (address) {
        require(msg.value >= _prizePool, "deposit too small");

        // Create a new contract
        address clone = Clones.clone(fundingImplementation);

        // Initialize the contract
        (bool success, ) = clone.call(
            abi.encodeWithSignature(
                "initialize(string,uint256,uint256)",
                _eventCId,
                _prizePool,
                _duration
            )
        );
        require(success, "creation failed");

        _deployedContracts.push(clone);

        // Transfer the prize pool to the new contract
        payable(clone).transfer(_prizePool);

        emit newFundingCreated(
            msg.sender,
            _prizePool,
            clone,
            _eventCId
        );
        return clone;
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "nothing to withdraw");
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "withdrawal failed");
    }

    function deployedContracts() public view returns (address[] memory) {
        return _deployedContracts;
    }

    function getTime() public view returns (uint256) {
        return block.timestamp;
    }

    receive() external payable {}
}
