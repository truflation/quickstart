// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract TruflationTester is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public inflation;
    using Chainlink for Chainlink.Request;
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    constructor(address _link) ConfirmedOwner(msg.sender) {
        setChainlinkToken(_link);
        
        // Please refer to README and find corresponding chain's information

        // Ethereum mainnet
        // oracle = 0xfE2dD37BC29f5fc4E0cad8F58F4Dbf4AddD5A59A;
        // jobId = "b04c2a85143c43089c1befe7c41dea93";

        // BNB Smart Chain Mainnet
        // oracle = 0x02a1BE5682f4Fcc941746e95f095c356A7f4D480;
        // jobId = "b04c2a85143c43089c1befe7c41dea93";

        // Ethereum Rinkeby Testnet (Chain ID: 4)
        oracle = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
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

    function resetInflation() public {
        inflation = 0;
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
    require(link.transfer(msg.sender, link.balanceOf(address(this))),
    "Unable to transfer");
  }


}
