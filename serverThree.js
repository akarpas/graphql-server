const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const makeExecutableSchema = require('graphql-tools')
const cors = require('cors')

const URL = 'http://localhost'
const PORT = '4000'
const DB = 'lm-develop'
const MONGO_URL = 'mongodb://localhost:27017/lm-develop'

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

const start = async () => {
  const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
  const db = client.db(DB)
  const SoundcloudCharts = db.collection('soundcloudchart')

  const typeDefs = [`
    type Query {

    }
  `
  ]

}

start()