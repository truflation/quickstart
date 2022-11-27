# Quickstart

Query [Truflation](http://www.truflation.com) NFT and CPI data by
following one of the guides below, based on your use case.

See our [Youtube demonstration](https://www.youtube.com/watch?v=lugCHOxKBPg) to see how to run
through these tutorials.

# Smart contracts

The demonstration smart contracts provide a simple interface to
retrieve the current year-on-year truflation index for US CPI .
Please contact truflation for additional data which we have available
on the blockchain.

These contracts have not been audited and are should be used at your
own risk.  ***Values that are available through testnets include a random
fuzz and should be used for testing only.***

## 1. Testing with truflationTester

To test out the truflation API, go to [[http://marketplace.truflation.com/]]


## 2. Deploying the truflation tester

1. Get some LINK from [ChainLink's faucet](https://faucets.chain.link/) (make sure to choose "Ethereum Goerli")
2. [Open Truflation in Remix IDE](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/quickstart/main/TruflationTester.sol)
3. navigate to "Solidity Compiler" from the side menu and click on "Compile TruflationTester.sol"
4. navigate to "deploy & run transactions" from the side menu, set the "environment" to "Injected Web3", and log into your Metamask if necessary.
5. set the "contract" field to `TruflationTester`
6. Insert the oracle id, job id, and fee (wei) from the list of [available networks](network.md).  The fee should be 1000000000000 (10*16 wei).
7. press "deploy" and sign with Metamask, wait for the transaction to be confirmed
8. when confirmed, your deployed contract will be visible in "deployed contracts" below the "deploy" button that you just pressed
9. press the "copy" icon to the right of your contract name (shown as something like "TRUFLATIONTESTER AT 0x000..0000 (BLOCKCHAIN)") to get your contract's address
10. send some Goerli (or relevant network) LINK directly to your smart contract's address via Metamask or other wallet (0.01 LINK per call - ** if you have a transaction revert issue this means that you did not send the LINK **
11. Click on the down arrow to open up the interface to the deployed contracts
12. press the orange `requestYoYInflation` button to fetch inflation data from Chainlink and store the result in your contract
13. when confirmed, press the blue `yoyInflation` button to see the result

The deployed contract will return the yoyInflation value as a string.
If you need the result as a uint256 wei value, please uncomment the
parts of the smart contract that convert the response of the
truflation server into a integer.

If you wish to have your contract runnable via ethereum use [solt](https://github.com/hjubb/solt) to generate a json file and upload
this file to the verify and publish contracts feature of etherscan.

# Sample web3 frontend

A sample web3 frontend using truflation data is available in the
[sample-frontend repo](https://github.com/truflation/sample-frontend).

# NFT Data

* [NFT Data Queries](nft-api.md)

# Chainnode

Adapters and node toml files to implement the API are available on github

# Help and links

* [Truflation discord developer chat](https://discord.com/channels/967280164071407666/968071680360587264)
* [Network endpoints](network.md)
* [Using solt to get a contract on etherscan](https://blog.jubb.xyz/post/solt-release/)
