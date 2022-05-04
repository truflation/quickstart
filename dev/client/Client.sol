// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract MyClient is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;
    bytes public result;
    mapping(bytes32 => bytes) public results;
    address public oracleId;
    bytes32 public jobId;
    uint256 public fee;

    constructor(address oracleId_, string memory jobId_,
                uint256 fee_) ConfirmedOwner(msg.sender) {
        setPublicChainlinkToken();
        oracleId = oracleId_;
        jobId = bytes32(bytes(jobId_));
        fee = fee_;
    }

    function doRequest(
        string memory service,
        string memory data,
        string memory keypath,
	string memory abi_) public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, 
            address(this), this.fulfillBytes.selector);
        req.add("service", service);
	    req.add("data", data);
        req.add("keypath", keypath);
	req.add("abi", abi_);
        return sendChainlinkRequestTo(oracleId, req, fee);
    }

    function fulfillBytes(bytes32 _requestId, bytes memory bytesData) public recordChainlinkFulfillment(_requestId) {
        result = bytesData;
	results[_requestId] = bytesData;
    }

    function changeOracle(address _oracle) public onlyOwner {
        oracleId = _oracle;
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