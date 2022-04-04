// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract TruflationTester is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public inflation;
    using Chainlink for Chainlink.Request;
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;


    constructor() ConfirmedOwner(msg.sender) {
        setPublicChainlinkToken();
        setPublicChainlinkToken();

	//mainnet
        // oracle = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
	// jobId = "8ec81f6d1d75448b8f44742ff07199e3";

        //rinkeby
	oracle = 0x142b60da0bfA583Dc2877e2aC12B7f511b8bD2db;
        jobId = "3381d621bc574c4590163a12a990c377";
        fee = 1 * 10 ** 16;
  }


    function requestInflationData(string memory _inflationData) public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("truflation", "https://api.truflation.com/current");
        request.add("path", _inflationData);
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _inflation) public recordChainlinkFulfillment(_requestId) {
        inflation = _inflation;
    }

    function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }


}