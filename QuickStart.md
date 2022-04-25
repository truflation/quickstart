
== Testing with existing smart contract ==

An existing smart contract is available on [Rinkeby testnet](https://rinkeby.etherscan.io/address/0x769dadc1bdBAF9d129D54981636Dcd96EdB57c0d)

Because you are sharing the contract with other users, you should not use this contract for production purposes

To use the contract
1. Connect this contract with metamask
2. send the link fee of 0.01 LINK to the smart contract.  Test LINK
   can be taken from [ChainLink faucet](https://faucets.chain.link/)
3. click on requestInflationData under "Write Contract"
4. wait for the node to respond
5. click inflation under "Read Contract"

== Deploying your own smart contract ==

1. Get some LINK from [ChainLink faucet](https://faucets.chain.link/)
2. Load [Truflation](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/quickstart/main/TruflationTester.sol)
   into remix
3. replace `oracle` & `jobId` according to your network from [README](https://github.com/truflation/quickstart/blob/main/README.md)
4. compile
5. fill in \_link with the corresponding [link token address](https://docs.chain.link/docs/link-token-contracts/)
6. deploy to Injected web3 & mark down your contract address
7. send some LINK to your smart contract - 0.01 to run
8. call function `requestInflationData`/`requestNftData`
9. wait for `inflation`/`nftData` to update
10. call `inflation`/`nftData` to get the result
