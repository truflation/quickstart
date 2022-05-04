import bar from './bar.js'
const cbor = require('cbor-web')

const CLIENT_ABI = require('./client_abi.json')
const ERC20_ABI = require('./erc20.json')

export function foo (a) {
  console.log(a)
  bar()
  return a
}

function hexStringToByteArray (hexString) {
  if (hexString.length % 2 !== 0) {
    throw new Error('Must have an even number of hex digits to convert to bytes')
  }
  let numBytes = hexString.length / 2
  let start = 0
  if (hexString.substr(0, 2) === '0x') {
    start = 1
    numBytes = numBytes - 1
  }
  const byteArray = new Uint8Array(numBytes)
  for (let i = start; i < numBytes + start; i++) {
    byteArray[i - start] = parseInt(hexString.substr(i * 2, 2), 16)
  }
  return byteArray
}

export function decode (web3, abi, data) {
  if (abi === '' || abi === undefined || abi === 'cbor') {
    console.log('cbor', data)
    const byteArray = hexStringToByteArray(data)
    const d = cbor.decodeFirstSync(byteArray)
    console.log(d)
    return d
  }

  if (abi === 'json') {
    console.log(data)
    const byteArray = hexStringToByteArray(data)
    const string = new TextDecoder().decode(byteArray)
    return JSON.parse(string)
  }
  return web3.eth.abi.decodeParameter(abi, data)
}

export class Oracle {
  constructor (w3, address, from) {
    this.w3 = w3
    this.address = address
    this.from_address = from
    console.log(w3, address)
    this.oracle = new this.w3.eth.Contract(
      CLIENT_ABI, this.address)
  }

  async send_fee () {
    console.log('send_fee')
    if (this.link_token === undefined) {
      this.link_token = await this.oracle.methods.getChainlinkToken().call()
      this.token_contract = new this.w3.eth.Contract(
        ERC20_ABI, this.link_token
      )
    }
    const fee = await this.oracle.methods.fee().call()
    console.log(fee)
    const transfer = this.token_contract.methods.transfer(
      this.address, fee
    )
    console.log(this.from_address)
    return transfer.send({
      from: this.from_address,
      to: this.address
    })
  }

  async withdraw_link () {
    const withdraw = this.oracle.methods.withdrawLink()
    return await withdraw.send({
      from: this.from_address,
      to: this.address
    })
  }

  async send_request (service, data, parse, abi) {
    await this.send_fee()
    console.log('fee sent')
    const request = this.oracle.methods.doRequest(
      service, data, parse, abi
    )
    const txn = await request.send({
      from: this.from_address,
      to: this.address
    })
    console.log('request sent')
    return txn
  }
}
