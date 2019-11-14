const Movie = require('../models/movie.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.index = (_, res, next) => {
  Movie.find()
    .then(movies => {
      res.render('movies/index', { movies })
    })
    .catch(next)
}

module.exports.show = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      if (movie) {
        res.render('movies/show', { movie })
      } else {
        next(createError(404, `Movie not found`));
      }
    })
    .catch(next)
}

module.exports.new = (_, res) => {
  res.render('movies/new', { movie: new Movie() })
}

module.exports.create = (req, res, next) => {
  const movie = new Movie(req.body)
  
  movie.save()
    .then(() => {
      res.redirect('/movies')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('movies/new', { movie, error: error.errors })
      } else {
        next(error);
      }
    })
}

module.exports.delete = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/movies'))
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      if (movie) {
        res.render('movies/edit', { movie })
      } else {
        next(createError(404, `Movie not found`));
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(movie => {
      if (movie) {
        res.redirect('/movies')
      } else {
        next(createError(404, `Movie not found`));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('movies/edit', { movie: req.body, error: error.errors })
      } else {
        next(error);
      }
    })
}
