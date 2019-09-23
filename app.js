'use strict';

const express = require('express')
const app = express()
const slsHTTP = require('serverless-http') // this module wraps our API for serverless use

app.get('/', async(req, res, next) => {
  res.status(200).send('Hello World')
})

module.exports.server = slsHTTP(app)