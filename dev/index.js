// SPDX-License-Identifier: MIT
//
// This is an adapter for chainlink that dispatches incoming requests
// to various services which expects a JSON reply/response

const express = require('express')
const bodyParser = require('body-parser')
const { Requester, Validator } = require('@chainlink/external-adapter')

const app = express()
const port = process.env.EA_PORT || 8081

const services_url = {
  'nft-index' : 'http://localhost:8080/foo/bar'
};

const services_func = {
  'echo' : (req, res) => {
    console.log('POST Data: ', req.body)
    let retval = req.body.data == undefined ? {} : req.body.data;
    if (typeof retval === 'string' || data instanceof String)
      retval = JSON.parse(retval)
    console.log('returning: ', retval)
    res.json(retval)
  }
};

app.use(bodyParser.json())

app.post('/', (req, res) => {
  console.log('POST Data: ', req.body)
  const service = req.body['service']
  if (service == undefined) {
    res.status(500).send("No service")
    return
  }

  if (services_func[service] != undefined) {
    services_func[service](req, res)
    return
  }

  createRequest(req.body, (status, result) => {
    console.log('Result: ', result)
    res.status(status).json(result)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))

function createRequest (input, callback) {
  const validator = new Validator(callback, input)
  const jobRunID = validator.validated.id
  const service = input['service']
  const url = services_url[service];
  let data = input['data']
  if (typeof data === 'string' || data instanceof String)
    data = JSON.parse(data)

  if (url != undefined) {
    Requester.request(
      {
        method: 'post',
        url: url,
        data: data,
        timeout: 300000
      }
    )
      .then(response => {
        const value = JSON.parse(JSON.stringify(input))
        response.data.result = Requester.getResult(value, [])
        callback(response.status, Requester.success(jobRunID, response))
      })
      .catch(error => {
        callback(500, Requester.errored(jobRunID, error))
      })
  }
}

// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}
