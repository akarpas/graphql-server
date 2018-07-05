const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')
const moviesData = require('./data/moviesData')

// Create a simple GraphQL schema
const schema = buildSchema(`
  type Query {
    movie(id: Int!): Movie
    movies(genre: String): [Movie]
  },
  type Movie {
    id: Int
    title: String
    director: String
    synopsis: String
    genre: String
  }
`)

const getMovie = (args) => {
  const id = args.id
  return moviesData.filter(movie => {
    return movie.id === id
  })[0]
}

const getMovies = (args) => {
  if (args.genre) {
    const genre = args.genre
    return moviesData.filter(
      movie => movie.genre === genre
    )
  } else {
    return moviesData
  }
}

// Create root resolver
// A resolver contains the mapping of actions to functions
const root = {
  movie: getMovie,
  movies: getMovies
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