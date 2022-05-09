// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


contract TruflationTester is ChainlinkClient, ConfirmedOwner {
  using Chainlink for Chainlink.Request;
  
  string public yoyInflation;
  using Chainlink for Chainlink.Request;
  address public oracleId;
  string public jobId;
  uint256 public fee;

  // Please refer to
  // https://github.com/truflation/quickstart/blob/main/network.md
  // for oracle address. job id, and fee for a given network

  constructor(
    address oracleId_,
    string memory jobId_,
    uint256 fee_
  ) ConfirmedOwner(msg.sender) {
    setPublicChainlinkToken();
    oracleId = oracleId_;
    jobId = jobId_;
    fee = fee_;
  }

        
  function requestYoyInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillYoyInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "yearOverYearInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillYoyInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    yoyInflation = string(_inflation);
  }

  function changeOracle(address _oracle) public onlyOwner {
    oracleId = _oracle;
  }

  function changeJobId(string memory _jobId) public onlyOwner {
    jobId = _jobId;
  }

  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))),
    "Unable to transfer");
  }

/*
  // The following are for retrieving inflation in terms of wei
  // This is useful in situations where you want to do numerical
  // processing of values within the smart contract

  uint256 public inflationWei;
  function requestInflationWei() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillInflationWei.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "yearOverYearInflation");
    req.add("abi", "uint256");
    req.add("multiplier", "1000000000000000000");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillInflationWei(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    inflationWei = toUint256(_inflation);
  }

  function toUint256(bytes memory _bytes) internal pure
  returns (uint256 value) {
    assembly {
      value := mload(add(_bytes, 0x20))
    }
  }
*/
}
