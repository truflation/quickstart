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

	      // mainnet (trustednode)
        // oracle = 0xB75e9a5d8ed256De9b5834C32fc54D4b4d095F57;
	      // jobId = "66922acd76274fc18ba461daf7d94c52";

        //rinkeby
	      // oracle = 0x142b60da0bfA583Dc2877e2aC12B7f511b8bD2db;
        // jobId = "3381d621bc574c4590163a12a990c377";
  
        // kovan (trustednode)
        oracle = 0xe9aC78349CEe875C8a3F31464045B9096B836f63;
        jobId = "b04c2a85143c43089c1befe7c41dea93";

        fee = 1 * 10 ** 16;
  }


    function requestInflationData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _inflation) public recordChainlinkFulfillment(_requestId) {
        inflation = _inflation;
    }

    function changeOracle(address _oracle) public onlyOwner {
        oracle = _oracle;
    }

    function changeJobId(string memory _jobId) public onlyOwner {
        jobId = bytes32(bytes(_jobId));
    }

    function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
  }


}
