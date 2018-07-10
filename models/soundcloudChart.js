const mongoose = require('mongoose')
const Schema = mongoose.Schema

const soundcloudChartSchema = new Schema({
  chartType: String,
  chartDate: Date,
  chartGenre: String,
  trackName: String,
  artist: String,
  user: String,
  userId: String,
  trackPosition: Number,
  songGenre: String,
  trackScore: Number,
  trackLikes: Number,
  trackPlaycount: Number
},{ collection: 'soundcloudchart' })

const soundcloudChart = mongoose.model('soundcloudchart', soundcloudChartSchema)

module.exports = soundcloudChart
