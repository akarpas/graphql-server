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
  const soundcloudCharts = db.collection('soundcloudcharts')

  // soundcloudCharts.find({}).toArray((err, docs) => {
  //   docs.forEach(doc => {
  //     console.log(doc.trackName)
  //   })
  // })

  const typeDefs = [`
    type Query {
      chart(user: String): SoundcloudChart
    }

    type SoundcloudChart {
      _id: String
      chartType: String
      chartDate: Date
      chartGenre: Sting
      trackName: String
      artist: String
      user: String
      userId: String
      trackPosition: Number
      songGenre: String
      trackScore: Number
      trackLikes: Number
      trackPlaycount: Number
    }

    schema {
      query: Query
    }
  `
  ]

}

start()