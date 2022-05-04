// Spdx-License-Identifier: MIT
// Copyright 2022 - Laguna Labs
//
// This is a simple chainlab adapter that processes incoming json
// packages and outputs json.

/* eslint n/no-callback-literal: 0 */

const express = require('express')
const bodyParser = require('body-parser')
const { Requester, Validator } = require('@chainlink/external-adapter')
const Web3EthAbi = require('web3-eth-abi')
const JSONKeyPath = require('json-keypath')
const cbor = require('cbor')

function extractData (data, keypath, abi) {
  let json = true
  if (keypath !== undefined &&
        keypath !== '') {
    data = JSONKeyPath.getValue(
      data, keypath
    )
  }
  if (abi === undefined ||
        abi === '' ||
        abi === 'cbor') {
    data = cbor.encode(data)
    json = false
  } else if (abi !== 'json') {
    data = Web3EthAbi.encodeParameter(abi, data)
    json = false
  }
  console.log(data, json)
  return [data, json]
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

  process (req, res) {
    console.log('POST Data: ', req.body)
    const service = req.body.service
    if (service === undefined) {
      res.status(500).send('No service')
      return
    }

    if (this.services.func[service] !== undefined) {
      this.services.func[service](req, res)
      return
    }

    this.createRequest(req.body, (status, result) => {
      console.log('Result: ', result[0])
      console.log(typeof result[0])
      if (result[1]) {
        res.status(status).json(result[0])
      } else {
        res.status(status).write(result[0])
        res.end(undefined, 'binary')
      }
    })
  }

  createRequest (input, callback) {
    const service = input.service
    let url = this.services.urlPost[service]
    let method = 'post'
    if (url === undefined) {
      method = 'get'
      url = this.services.urlGet[service]
    }

    if (url === undefined) {
      return
    }

    let data = input.data
    if ((typeof data === 'string' ||
         data instanceof String) &&
        data.replace(/\s/g, '').length) {
      data = JSON.parse(data)
    }

    console.log('Url: ', url)
    if (data === undefined) {
      data = {}
    }
    console.log('Data: ', data)
    Requester.request(
      {
        method,
        url,
        data,
        timeout: 300000
      }
    )
      .then(response => {
        const [retval, json] = extractData(
          response.data, input.keypath, input.abi
        )
        console.log(retval)
        callback(response.status, [retval, json])
      })
      .catch(error => {
        callback(500, Requester.errored(0, error))
      })
  }

  listen (port) {
    this.app.listen(port, () => console.log(`Listening on port ${port}!`))
  }
}

module.exports = {
    ApiAdapter,
    extractData
};
