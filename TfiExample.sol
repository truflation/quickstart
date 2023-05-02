// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "./TfiClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/OperatorInterface.sol";


contract TfiExample is Initializable, OwnableUpgradeable, TfiClient {
    using Chainlink for Chainlink.Request;
    bytes public result;
    mapping(bytes32 => bytes) public results;
    address public oracleId;
    string public jobId;
    uint256 public fee;

    function initialize(
      address oracleId_,
      string memory jobId_,
      uint256 fee_,
      address token_) public initializer {
        __Ownable_init();
        __TfiClient_init();
        setChainlinkToken(token_);
        oracleId = oracleId_;
        jobId = jobId_;
        fee = fee_;
    }

    function doRequest(
        string memory service_,
        string memory data_,
        string memory keypath_,
        string memory abi_,
        string memory multiplier_) public returns (bytes32 requestId) {
          Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(bytes(jobId)),
            address(this), this.fulfillBytes.selector);
        req.add("service", service_);
        req.add("data", data_);
        req.add("keypath", keypath_);
        req.add("abi", abi_);
        req.add("multiplier", multiplier_);
        return sendChainlinkRequestTo(oracleId, req, fee);
    }

    function doTransferAndRequest(
        string memory service_,
        string memory data_,
        string memory keypath_,
        string memory abi_,
        string memory multiplier_,
        uint256 fee_) public returns (bytes32 requestId) {
        require(LinkTokenInterface(getToken()).transferFrom(
               msg.sender, address(this), fee_), 'transfer failed');
        Chainlink.Request memory req = buildChainlinkRequest(
            bytes32(bytes(jobId)),
            address(this), this.fulfillBytes.selector);
        req.add("service", service_);
        req.add("data", data_);
        req.add("keypath", keypath_);
        req.add("abi", abi_);
        req.add("multiplier", multiplier_);
        req.add("refundTo",
                Strings.toHexString(uint160(msg.sender), 20));
        return sendChainlinkRequestTo(oracleId, req, fee_);
    }

    function fulfillBytes(bytes32 _requestId, bytes memory bytesData)
        public recordChainlinkFulfillment(_requestId) {
        result = bytesData;
        results[_requestId] = bytesData;
    }

    function changeOracle(address _oracle) public onlyOwner {
        oracleId = _oracle;
    }

    function changeJobId(string memory _jobId) public onlyOwner {
        jobId = _jobId;
    }

    function changeFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function changeToken(address _address) public onlyOwner {
        setChainlinkToken(_address);
    }

    function getToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function getChainlinkToken() public view returns (address) {
        return getToken();
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
            require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    function typeAndVersion() external pure virtual returns (string memory) {
        return "TFI 0.2";
    }

    // do not allow renouncing ownership
    function renounceOwnership() public view override onlyOwner {
    }
}
