const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const GraphQLDate = require('graphql-date')

const cors = require('cors')

const URL = 'http://localhost'
const PORT = '5050'
const ENDPOINT = '/graphql'
const HOMEPATH = '/graphiql'
const DB = 'lm-develop'
const MONGO_URL = 'mongodb://localhost:27017/lm-develop'

const start = async () => {
  const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
  const db = client.db(DB)
  const soundcloudCharts = db.collection('soundcloudcharts')

  const typeDefs = [`
    scalar Date

    type Query {
      chart(user: String): [SoundcloudChart]
      charts: [SoundcloudChart]
    }

    type SoundcloudChart {
      _id: ID!
      chartType: String
      chartDate: Date
      chartGenre: String
      trackName: String
      artist: String
      user: String
      userId: String
      trackPosition: Int
      songGenre: String
      trackScore: Int
      trackLikes: Int
      trackPlaycount: Int
    }

    schema {
      query: Query
    }
  `]

  const resolvers = {
    Date: GraphQLDate,
    Query: {
      chart: async (root, {user}) => {
        return (await soundcloudCharts.find({ user: user }).toArray())
      },
      charts: async (root, {}) => {
        return (await soundcloudCharts.find({}).toArray())
      } 
    }
  }

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })

  const app = express()

  app.use(cors())
  app.use(ENDPOINT, bodyParser.json(), graphqlExpress({schema}))
  app.use(HOMEPATH, graphiqlExpress({
    endpointURL: ENDPOINT
  }))

  app.listen(PORT, () => {
    console.log(`Server is running on ${URL}:${PORT}${HOMEPATH}`)
  })
}

start()