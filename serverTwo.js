const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a simple GraphQL schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`)

// Create root resolver
// A resolver contains the mapping of actions to functions
const root = {
  message: () => 'Hello World!'
}

// Create Express server with a GraphQL endpoint
const app = express()

// APP.USE Parameters:
// 1 - URL Endpoint as string (/graphql)
// 2 - Result of the express_graphql function is handed over
// containing 3 properties (schema, rootValue, graphiql)
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(
  4000,
  () => console.log(
    'Express GraphQL Server Now Running on Port 4000 (localhost:4000/graphql)'
  )
)