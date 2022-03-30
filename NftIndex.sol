// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract NftIndexTester is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public data;
    using Chainlink for Chainlink.Request;
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;


    constructor() ConfirmedOwner(msg.sender) {
        setPublicChainlinkToken();
        setPublicChainlinkToken();

	      //mainnet
        // oracle = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
        // jobids
        // indexName: cd7bea47b73a4d47a5cedecf00b9b561
        // indexValue: d06b539cdbeb450aa72f2e70223078af
        // aDayChange: 3d2a6108056644c38f98d755536eb5ac
        // aMonthChange: b871377caf1f4ccb851189f8d906c277

        //rinkeby
	      oracle = 0x142b60da0bfA583Dc2877e2aC12B7f511b8bD2db;
        // jobids
        // indexName: 172dd45ffdd841318c8a7bd1ed796941
        // indexValue: 72d3a64f5d32496695437f66a2a47392
        // aDayChange: da8ace1c545f4dc58096b08c7ea48114
        // aMonthChange: 8d1071dec39a4a7ba940996983b07b34
        jobId = "172dd45ffdd841318c8a7bd1ed796941";
        fee = 1 * 10 ** 16;
  }


    function requestData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        int timesAmount;
        request.addInt("times", timesAmount);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _data) public recordChainlinkFulfillment(_requestId) {
        data = _data;
    }

    function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }
}
