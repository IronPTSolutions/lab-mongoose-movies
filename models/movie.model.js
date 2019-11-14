const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  plot: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;