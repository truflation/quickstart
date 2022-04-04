// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract NftIndexTester is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    struct NftData {
        string indexName;
        int256 indexValue;
        int256 aDayChange;
        int256 aMonthChange;
    }

    NftData public nftData;
    string public indexName;
    int256 public indexValue;
    int256 public aDayChange;
    int256 public aMonthChange;
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;


    constructor() ConfirmedOwner(msg.sender) {
        setPublicChainlinkToken();
        setPublicChainlinkToken();

	    //mainnet (trustednode)
        // oracle = 0xB75e9a5d8ed256De9b5834C32fc54D4b4d095F57;
	    // jobId = "a492998425084c46bb5009b77cf06cb7";

        //kovan (trustednode)
	    oracle = 0xe9aC78349CEe875C8a3F31464045B9096B836f63;
        jobId = "b00cc6f81b314aa18cf94b5fb33e018c";
        
        fee = 1 * 10 ** 16;
    }


    function requestNftData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, string calldata _indexName, int256 _indexValue, int256 _aDayChange, int256 _aMonthChange) public {
        nftData.indexName = _indexName;
        nftData.indexValue = _indexValue;
        nftData.aDayChange = _aDayChange;
        nftData.aMonthChange = _aMonthChange;
        indexName = _indexName;
        indexValue = _indexValue;
        aDayChange = _aDayChange;
        aMonthChange = _aMonthChange;
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
