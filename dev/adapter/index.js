// Spdx-License-Identifier: MIT
// Copyright 2022 - Laguna Labs
//
// This is a simple chainlab adapter that processes incoming json
// packages and outputs json.

/* eslint n/no-callback-literal: 0 */

const { ApiAdapter, extractData } = require('./api_adapter')

const app = new ApiAdapter({
  urlPost: {
    'indexa': 'http://foo.bar'
  },
  urlGet: {
    'indexb': 'http://foo1.bar'
  },
  func: {
    echo: (req, res) => {
      console.log('POST Data: ', req.body)
      let data = req.body.data === undefined ? {} : req.body.data
      if (typeof data === 'string' || data instanceof String) {
        data = JSON.parse(data)
      }
      const [retval, json] = extractData(
        data, req.body.keypath, req.body.abi
      )
      if (json) {
        res.json(retval)
      } else {
        res.write(retval)
        res.end(undefined, 'binary')
      }
    }
  }
})

app.listen(process.env.EA_PORT || 8081)
