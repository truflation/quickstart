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


    constructor(address _link) ConfirmedOwner(msg.sender) {

        setChainlinkToken(_link);
        
        //Please refer to README and find corresponding chain's information
	    oracle = 0x02a1BE5682f4Fcc941746e95f095c356A7f4D480;
        jobId = "eb4f0d822a4c481ca88e5a3ab2fec562";
        
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

    function resetData() public {
        nftData.indexName = "";
        nftData.indexValue = 0;
        nftData.aDayChange = 0;
        nftData.aMonthChange = 0;
        indexName = "";
        indexValue = 0;
        aDayChange = 0;
        aMonthChange = 0;
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
