# Quickstart

Query Truflation's inflation data by following one of the guides below, based on your use case.

## 1. Testing with existing smart contract

An existing smart contract is available for testing purposes on [Rinkeby testnet](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0). This contract fetches inflation data from Truflation's Rinkeby Chainlink node and stores the last result that it fetched.

This contract is made available only for demonstration purposes and should not be used in production by your application.

To query the contract
1. [Visit the "Read Contract" page on Rinkeby Etherscan](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0#readContract)
2. Query the inflation value to see the last value fetched. click inflation under ["Read Contract"](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0#readContract).  The inflation value is available as a string or as an integer.
3. To fetch a new value, navigate to ["Write Contract"](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0) and call `RequestInflationDataString` or `RequestInflationDataWei`. The call will not be made successfully if the contract is out of Rinkeby LINK. You can send the link fee of 0.01 LINK directly to the smart contract. Rinkeby testnet LINK
   can be acquired from [ChainLink faucet](https://faucets.chain.link/)
4. wait for the node to respond


## 2. Deploying your own smart contract

1. Get some LINK from [ChainLink's faucet](https://faucets.chain.link/) (make sure to choose "Ethereum Rinkeby")
2. [Open Truflation in Remix IDE](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/quickstart/main/TruflationTester.sol)
3. To use a network other than Rinkeby, uncomment or specify the relevant `oracle` & `jobId` accordingly (full list of available networks available  [here](https://github.com/truflation/quickstart/blob/main/README.md))
4. navigate to "Solidity Compiler" from the side menu and click on "Compile TruflationTester.sol"
5. navigate to "deploy & run transactions" from the side menu, set the "environment" to "Injected Web3", and log into your Metamask if necessary.
6. set the "contract" field to `TruflationTester`
7. Insert the oracle id, job id, and fee (wei) in the contract
8. press "deploy" and sign with Metamask, wait for the transaction to be confirmed
9. when confirmed, your deployed contract will be visible in "deployed contracts" below the "deploy" button that you just pressed
10. press the "copy" icon to the right of your contract name (shown as something like "TRUFLATIONTESTER AT 0x000..0000 (BLOCKCHAIN)") to get your contract's address
11. send some Rinkeby (or relevant network) LINK directly to your smart contract's address via Metamask or other wallet (0.01 LINK per call)
12. press the orange `requestInflationDataString` or `requestInflationDataWei` button to fetch inflation data from Chainlink and store the result in your contract
13. when confirmed, press the blue `inflation` button to see the result

## Interfacing with web

An example web3 app to interface with the contract is in the directory frontend