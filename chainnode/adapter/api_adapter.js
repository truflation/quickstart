// Spdx-License-Identifier: MIT
// Copyright 2022 - Laguna Labs
//
// This is a simple chainlab adapter that processes incoming json
// packages and outputs json.

const express = require('express')
const bodyParser = require('body-parser')
const { Requester } = require('@chainlink/external-adapter')
const Web3EthAbi = require('web3-eth-abi')
const JSONKeyPath = require('json-keypath')
const cbor = require('cbor')
const { create } = require('ipfs-http-client')
const client = create('https://ipfs.infura.io:5001/api/v0')

async function extractData (data, header) {
  const keypath = header.keypath
  const multiplier = header.multiplier
  let abi = header.abi
  console.log(header)

  let json = true
  if (keypath !== undefined &&
      keypath !== '') {
    data = JSONKeyPath.getValue(
      data, keypath
    )
  }
  console.log(multiplier)
  if (multiplier !== undefined &&
      multiplier !== '') {
    if (Array.isArray(data)) {
      data = data.map((x) => BigInt(x * multiplier))
    } else {
      data = BigInt(data * multiplier)
    }
  }

  if (abi === undefined || abi === '') {
    abi = 'json'
  }
  if (abi === 'ipfs' || abi === 'ipfs/json') {
    const r = await client.add(JSON.stringify(data))
    data = r.path
    json = false
  } else if (abi === 'ipfs/cbor') {
    const r = await client.add(cbor.encode(data))
    data = r.path
    json = false
  } else if (abi === 'cbor') {
    data = cbor.encode(data)
    json = false
  } else if (abi !== 'json') {
    data = Web3EthAbi.encodeParameter(abi, data)
    json = false
  }
  console.log(data, json)
  return [data, json]
}

function serialize(obj) {
  let str = [];
  for (var p in obj)
    if (p in obj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

class ApiAdapter {
  constructor (services) {
    this.services = services
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.post('/', (req, res) => {
      this.process(req, res)
    })
  }

  async process (req, res) {
    console.log('POST Data: ', req.body)
    const service = req.body?.service
    if (service === undefined) {
      res.status(200).json({'error': 'No service'})
      return
    }

    if (this?.services?.func[service] !== undefined) {
      this.services.func[service](req, res)
      return
    }

    this.createRequest(req.body, (status, result) => {
      console.log('Result: ', result[0])
      console.log(typeof result[0])
      try {
        if (result[1]) {
          res.status(status).json(result[0])
        } else {
          res.status(status).write(result[0])
          res.end(undefined, 'binary')
        }
      } catch (err) {
        res.status(200).send(err)
      }
    })
  }

  async createRequest (input, callback) {
    const service = input.service
    let url = this.services?.urlPost[service]
    let method = 'post'
    if (url === undefined) {
      method = 'get'
      url = this.services?.urlGet[service]
    }

    if (url === undefined) {
      callback(200, ["no service", false])
      return
    }


    let data = input.data
    if ((typeof data === 'string' ||
         data instanceof String) &&
        data.replace(/\s/g, '').length) {
      data = JSON.parse(data)
    }
    if (data === undefined) {
      data = {}
    }

    if (this.services?.urlEncodeData[service] === true) {
      console.log('urlencode')
      url = url + "?" + serialize(data)
      console.log(url)
      data = {}
    }

    console.log('Url: ', url)
    console.log('Data: ', data)
    Requester.request(
      {
        method,
        url,
        data,
        timeout: 300000
      }
    )
      .then(async response => {
        const [retval, json] = await extractData(
          response.data, input
        )
        console.log(retval)
        callback(response.status, [retval, json])
      })
      .catch(error => {
        callback(200, [Requester.errored(0, error), false])
      })
  }

  listen (port) {
    this.app.listen(port, () => console.log(`Listening on port ${port}!`))
  }
}

async function echoFunc (req, res) {
  console.log('POST Data: ', req.body)
  let data = req.body.data === undefined ? {} : req.body.data
  if (typeof data === 'string' || data instanceof String) {
    data = JSON.parse(data)
  }
  const [retval, json] = await extractData(
    data, req.body
  )
  if (json) {
    res.json(retval)
  } else {
    res.write(retval)
    res.end(undefined, 'binary')
  }
}

async function stub1Func (req, res) {
  console.log('POST Data: ', req.body)
  let data = req.body.data === undefined ? {} : req.body.data
  if (typeof data === 'string' || data instanceof String) {
    data = JSON.parse(data)
  }
  const range = data.range !== undefined ? data.range : [0.0, 1.0]
  const indexes = data.indexes !== undefined ? data.indexes : ['index']
  data = {}
  indexes.forEach(x => {
    data[x] = Math.random() * (range[1] - range[0]) + range[0]
  })
  const [retval, json] = extractData(
    data, req.body
  )
  if (json) {
    res.json(retval)
  } else {
    res.write(retval)
    res.end(undefined, 'binary')
  }
}

module.exports = {
  ApiAdapter,
  extractData,
  echoFunc,
  stub1Func
}
