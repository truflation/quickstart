This guide will allow you to query Truflation on the Rinkeby testnet. Follow the steps below to set up a smart contract that makes a query through Chainlink. A sample of this smart contract is deployed at ..., you can try querying it through `Contract > Read Contract > Method name`.

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
