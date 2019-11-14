const express = require('express');
const router = express.Router();
const celebritiesController = require('../controllers/celebrities.controller');
const moviesController = require('../controllers/movies.controller');

router.get('/', (_, res) => res.redirect('/celebrities'))

// Celebrities CRUD
router.get('/celebrities', celebritiesController.index)
router.get('/celebrities/new', celebritiesController.new)
router.get('/celebrities/:id', celebritiesController.show)
router.post('/celebrities', celebritiesController.create)
router.post('/celebrities/:id/delete', celebritiesController.delete)
router.get('/celebrities/:id/edit', celebritiesController.edit)
router.post('/celebrities/:id', celebritiesController.update)

// Moviews CRUD
router.get('/movies', moviesController.index)
router.get('/movies/new', moviesController.new)
router.get('/movies/:id', moviesController.show)
router.post('/movies', moviesController.create)
router.post('/movies/:id/delete', moviesController.delete)
router.get('/movies/:id/edit', moviesController.edit)
router.post('/movies/:id', moviesController.update)

module.exports = router;
