# Quickstart

Query [Truflation](http://www.truflation.com) inflation data by
following one of the guides below, based on your use case.

# Smart contracts

The demonstration smart contracts provide a simple interface to
retrieve the current year-on-year truflation index for US CPI .
Please contact truflation for additional data which we have available
on the blockchain.

These contracts have not been audited and are should be used at your
own risk.

## 1. Testing with truflationTester

An existing smart contract is available for testing purposes on [Rinkeby testnet](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0). This contract fetches inflation data from Truflation's Rinkeby Chainlink node and stores the last result that it fetched.

This contract is made available only for demonstration purposes and should not be used in production by your application.

To query the contract
1. [Visit the "Read Contract" page on Rinkeby Etherscan](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0#readContract)
2. Query the inflation value to see the last value fetched. click inflation under ["Read Contract"](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0#readContract).  The inflation value is available as a string or as an integer.
3. To fetch a new value, navigate to ["Write Contract"](https://rinkeby.etherscan.io/address/0x79053120810FdDf61ceFB781fc898D1cf52A44a0) and call `RequestInflationDataString` or `RequestInflationDataWei`. The call will not be made successfully if the contract is out of Rinkeby LINK. You can send the link fee of 0.01 LINK directly to the smart contract. Rinkeby testnet LINK
   can be acquired from [ChainLink faucet](https://faucets.chain.link/)
4. wait for the node to respond


## 2. Deploying the truflation tester

1. Get some LINK from [ChainLink's faucet](https://faucets.chain.link/) (make sure to choose "Ethereum Rinkeby")
2. [Open Truflation in Remix IDE](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/quickstart/main/TruflationTester.sol)
3. To use a network other than Rinkeby, uncomment or specify the relevant `oracle` & `jobId` accordingly (full list of available networks available  [here](https://github.com/truflation/quickstart/blob/main/README.md)).  The fee should be 1000000000000 (10*16 wei).
4. navigate to "Solidity Compiler" from the side menu and click on "Compile TruflationTester.sol"
5. navigate to "deploy & run transactions" from the side menu, set the "environment" to "Injected Web3", and log into your Metamask if necessary.
6. set the "contract" field to `TruflationTester`
7. Insert the oracle id, job id, and fee (wei) in the contract
8. press "deploy" and sign with Metamask, wait for the transaction to be confirmed
9. when confirmed, your deployed contract will be visible in "deployed contracts" below the "deploy" button that you just pressed
10. press the "copy" icon to the right of your contract name (shown as something like "TRUFLATIONTESTER AT 0x000..0000 (BLOCKCHAIN)") to get your contract's address
11. send some Rinkeby (or relevant network) LINK directly to your smart contract's address via Metamask or other wallet (0.01 LINK per call)
12. press the orange `requestInflationDataString` or `requestInflationDataWei` button to fetch inflation data from Chainlink and store the result in your contract
13. when confirmed, press the blue `inflationString` button to see the result

# Web3 frontend

A sample web3 frontend using truflation data is available in the [sample-frontend repo](https://github.com/truflation/sample-frontend).

The [Basic web3 app](https://truflation.github.io/sample-frontend/)
contains simple code that will allow you to query a smart contract
that provides the current year-on-year truflation index.

A set of [power
tools](https://truflation.github.io/sample-frontend/power-tools.html) is
available which will allowing you to send data via the truflation API.

# Getting help

To get help on these applications please connect with the [Truflation discord developer chat](https://discord.com/channels/967280164071407666/968071680360587264)

