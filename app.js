'use strict';

const express = require('express')
const app = express()
const slsHTTP = require('serverless-http') // this module wraps our API for serverless use
const bodyParser = require('body-parser') // parses the body of HTTP requests
const AWS = require('aws-sdk') // enables us to interact with AWS services and components

const PLAYERS_TABLE = process.env.PLAYERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

// POST - Create User endpoint
app.post('/players', function (req, res) {
  const { userId, name } = req.body;
const params = {
    TableName: PLAYERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };
dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not create user ${userId}` });
    }
    res.json({ userId, name });
  });
})
// GET - Get User endpoint
app.get('/players/:userId', function (req, res) {
  const params = {
    TableName: PLAYERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: `Could not get user ${userId}` });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: `User ${userId} not found` });
    }
  });
})

module.exports.server = slsHTTP(app)