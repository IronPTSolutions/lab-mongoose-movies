const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  plot: String
});

movieSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  foreignField: 'movie', // Find comments where `moviel_id`
  localField: '_id', // is equal to `_id`
  justOne: false
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
