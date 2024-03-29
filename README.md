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

1. Get some LINK from [ChainLink's faucet](https://faucets.chain.link/) (make sure to choose "Arbitrum Goerli")
2. [Open Truflation in Remix IDE](https://remix.ethereum.org/#url=https://raw.githubusercontent.com/truflation/quickstart/main/TruflationTester.sol)
3. navigate to "Solidity Compiler" from the side menu and click on "Compile TruflationTester.sol"
4. navigate to "deploy & run transactions" from the side menu, set the "environment" to "Injected Web3", and log into your Metamask if necessary.
5. set the "contract" field to `TruflationTester`
6. Insert the oracle id, job id, and fee (wei) from the list of [available networks](network.md).  The fee should be 50000000000000 (5 * 10**17 wei).  Get a token address from the list of [chainlink tokens](https://docs.chain.link/resources/link-token-contracts).  

For Arbitrum testnet  the parameters are:
* oracleid: 0x2118c39C092183F9140A339ADB2c3890644b00A2
* jobid: d220e5e687884462909a03021385b7ae
* fee: 500000000000000000
* token: 0xf97f4df75117a78c1A5a0DBb814Af92458539FB4

For Arbitrum mainnet the parameters are:
* oracleid: 0xF0ffC609da91d1931314BA5d17F1786db985D801
* jobid: a3fa982792ad486785be5d89ac333ab5
* fee: 500000000000000000
* token: 0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28

7. press "deploy" and sign with Metamask, wait for the transaction to be confirmed
8. when confirmed, your deployed contract will be visible in "deployed contracts" below the "deploy" button that you just pressed
9. press the "copy" icon to the right of your contract name (shown as something like "TRUFLATIONTESTER AT 0x000..0000 (BLOCKCHAIN)") to get your contract's address
10. send some Goerli (or relevant network) LINK directly to your smart contract's address via Metamask or other wallet (0.5 LINK per call - ** if you have a transaction revert issue this means that you did not send the LINK **
11. Click on the down arrow to open up the interface to the deployed contracts
12. press the orange `requestYoYInflation` button to fetch inflation data from Chainlink and store the result in your contract
13. when confirmed, press the blue `yoyInflation` button to see the result

The deployed contract will return the yoyInflation value as a string.
If you need the result as a uint256 wei value, please uncomment the
parts of the smart contract that convert the response of the
truflation server into a integer.

If you wish to have your contract runnable via ethereum use [solt](https://github.com/hjubb/solt) to generate a json file and upload
this file to the verify and publish contracts feature of etherscan.

# Recipes

* [Recipes](recipes.md)

# Commodities

To use commodities data use the following parameters as examples

```
data: {"ids": 603}
```

or

```
data: {"ids": 603, "date": "2023-01-01"}
```

where ids are available from [Commodities id list](data-ids.csv)

# NFT Data

* [NFT Data Queries](nft-api.md)

# Advanced users

Advanced users may want to use our hardhat units tests in the test
directory and the functions in TfiExample.sol.

Additional code for our contracts is available in
[tfi-marketplace](http://github.com.truflationdev/tfi-marketplace/)

This environment
contains additional contracts and frameworks for testing web3
infrastructure using our [Web3
api](http://github.com/truflationdev/tfi-api/).

# Sample web3 frontend

More data is available via [Truflation Marketplace](http://marketplace.truflation.com/)

A sample web3 frontend using truflation data is available in the
[sample-frontend repo](https://github.com/truflation/sample-frontend).

# Chainnode

Adapters and node toml files to implement the API are available on github


# Help and links

* [Advanced users](ADVANCED.md)
* [Truflation discord developer chat](https://discord.com/channels/967280164071407666/968071680360587264)
* [Network endpoints](network.md)
* [Using solt to get a contract on etherscan](https://blog.jubb.xyz/post/solt-release/)
