#!/bin/nodejs
//Spdx-License-Identifier: MIT
//
// This is a simple script that runs a remote solidity contract.
// the PRIVATE_KEY should be an environment variable in .env

const Web3 = require('web3');
const CLIENT_ADDRESS = "0xFFbD78E3D555B4e59Aa5766007a7ca15Ed5FB362"
require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider");

const CLIENT_ABI = require('./src/client_abi.json')
const ERC20_ABI = require('./src/erc20.json')

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
    return transfer.send({
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

  async send_request(service, data, parse, abi) {
    await this.send_fee()
    const request = this.oracle.methods.doRequest(
      service, data, parse, abi
    )
    const gas = await request.estimateGas()
    const txn = await request.send({
      from: myAddress,
      to: this.address,
      gas: gas
    })
    const id = txn.events.ChainlinkRequested.returnValues.id;
    const me = this;
    return txn;
  }
}

let oracle = new Oracle(w3, CLIENT_ADDRESS)

async function main() {
/*  oracle.oracle.events.ChainlinkRequested(
    {},
    (error, event)=> {console.log('foo', error, event);}
  )
*/
  let txn = await oracle.send_request("echo", "1000", "", "uint256")
  console.log(txn.events.ChainlinkRequested.returnValues.id);

/*
  txn = await oracle.send_request("echo",
                                  "{\"foo\": 1020}",
                                  "foo",
                                  'uint256')
  console.log(txn)

  txn = await oracle.send_request(
    "nft-index",
    '{"contracts":["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d","0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb","0x60e4d786628fea6478f785a6d7e704777c86a7c6","0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b","0x8a90cab2b38dba80c64b7734e58ee1db38b8992e","0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb","0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7","0xed5af388653567af2f388e6224dc7c4b3241c544","0xbd4455da5929d5639ee098abfaa3241e9ae111af","0xe785e82358879f061bc3dcac6f0444462d4b5330","0x1a92f7381b9f03921564a437210bb9396471050c"]}',
    "hello",
    "cbor")
    console.log(txn)
  txn = await oracle.send_request(
    "truflation/current",
    '{}',
    "",
    'cbor')
  console.log(txn)
  txn = await oracle.withdraw_link()
  console.log(txn)
*/
}

main()

