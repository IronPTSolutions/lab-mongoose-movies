const Comment = require('../models/comment.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  const movieId = req.params.id

  const comment = new Comment({
    ...req.body,
    movie: movieId
  })

  comment.save()
    .then(() => {
      res.redirect(`/movies/${movieId}`)
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.redirect(`/movies/${movieId}`)
      } else {
        next(error);
      }
    })
}

module.exports.delete = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.commentId)
    .then(() => res.redirect(`/movies/${req.params.id}`))
    .catch(next)
}
