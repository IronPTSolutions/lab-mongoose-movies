const Celebrity = require('../models/celebrity.model');
const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.index = (_, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/index', { celebrities })
    })
    .catch(next)
}

module.exports.show = (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      if (celebrity) {
        res.render('celebrities/show', { celebrity })
      } else {
        next(createError(404, `Celebrity not found`));
      }
    })
    .catch(next)
}

module.exports.new = (_, res) => {
  res.render('celebrities/new', { celebrity: new Celebrity() })
}

module.exports.create = (req, res, next) => {
  const celebrity = new Celebrity(req.body)
  
  celebrity.save()
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('celebrities/new', { celebrity, error: error.errors })
      } else {
        next(error);
      }
    })
}

module.exports.delete = (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/celebrities'))
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      if (celebrity) {
        res.render('celebrities/edit', { celebrity })
      } else {
        next(createError(404, `Celebrity not found`));
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then(celebrity => {
      if (celebrity) {
        res.redirect('/celebrities')
      } else {
        next(createError(404, `Celebrity not found`));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('celebrities/edit', { celebrity: req.body, error: error.errors })
      } else {
        next(error);
      }
    })
}
