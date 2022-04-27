#!/bin/nodejs

// SPDX-License-Identifier: MIT
//
// This is code that runs a test contract

const Web3 = require('web3');
const CLIENT_ADDRESS = "0xDEADBEEF"
require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");

const CLIENT_ABI = require('./client_abi.json')
const ERC20_ABI = require('./erc20.json')

const localKeyProvider = new HDWalletProvider({
  privateKeys: [process.env.PRIVATE_KEY],
  providerOrUrl: 'wss://rinkeby-light.eth.linkpool.io/ws'
})

let w3 = new Web3(localKeyProvider);
const myAccount = w3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
)
const myAddress = myAccount.address;

class Oracle {
  constructor(w3, address) {
    this.w3 = w3;
    this.address = address;
    this.oracle = new this.w3.eth.Contract(
      CLIENT_ABI, this.address)
  }

  async send_fee() {
    if (this.link_token == undefined) {
      this.link_token =  await this.oracle.methods.getChainlinkToken().call();
      this.token_contract = new this.w3.eth.Contract(
        ERC20_ABI, this.link_token
      )
    }
    const fee = await this.oracle.methods.fee().call();
    console.log(fee);
    const transfer = this.token_contract.methods.transfer(
      this.address, fee
    )
    const transfer_gas = await transfer.estimateGas({from: myAddress})
    return await transfer.send({
      from: myAddress,
      gas: transfer_gas,
      to: this.address
    })
  }

  async withdraw_link() {
    const withdraw = this.oracle.methods.withdrawLink()
    const gas = await withdraw.estimateGas({from: myAddress})
    return await withdraw.send({
      from: myAddress,
      gas: gas,
      to: this.address
    })
  }

  async send_request(service, data, parse) {
    await this.send_fee()
    const request = this.oracle.methods.doRequest(
      service, data, parse
    )
    const gas = await request.estimateGas()
    return await request.send({
      from: myAddress,
      to: this.address,
      gas: gas
    })
  }
}

async function main() {
  let oracle = new Oracle(w3, CLIENT_ADDRESS)
  let txn = await oracle.send_request("echo", "1000", "")
  console.log(txn);

  txn = await oracle.send_request("echo",
                                  "{\"foo\": 1020}",
                                  "foo")
  console.log(txn)
  txn = await oracle.withdraw_link()
  console.log(txn)
  process.exit(0)
}

main()

