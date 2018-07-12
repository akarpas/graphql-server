const { MongoClient } = require('mongodb')
const { GraphQLServer } = require('graphql-yoga')
const GraphQLDate = require('graphql-date')

const PORT = 5050
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

  const server = new GraphQLServer({
    typeDefs,
    resolvers
  })

  server.start(
    {port: PORT},
    () => console.log(`Server is running on http://localhost:${PORT}`)
  )
}

start()