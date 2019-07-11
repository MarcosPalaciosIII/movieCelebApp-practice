const express = require('express');
const router  = express.Router();
const Celeb = require('../models/celeb');
const Movie = require('../models/movies');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('movies/index');
});

router.get('/create', (req, res, next) => {
  Celeb.find()
  .then(celebs => {
    res.render('movies/create', {celebs});
  }).catch(err => next(err));
});

router.post('/create', (req, res, next) => {
  Movie.create(req.body)
  .then(newlyCreatedMovie => {
    res.locals.message = "You have successfully created a new movie";
    res.render(`movies/details`, {movieDetail: newlyCreatedMovie});
  }).catch(err => next(err));
});

 router.get('/list', (req, res, next) => {
   Movie.find()
   .then(moviesList => {
     res.render('movies/list', {moviesList});
   }).catch(err => next(err));
 });


router.get('/detail/:movieId', (req, res, next) => {
  // req.session.currentUser
  // if(!req.user) {
  //   res.redirect('/login');
  // }

  Movie.findById(req.params.movieId)
  .then(movieDetail => {
    // let theMSG = false;
    // if(req.params.created === 'movieDetails') {
    //   theMSG = "You have successfully created a new movie";
    //   res.locals.message = "You have successfully created a new movie";
    // }
    // data = {
    //   movieDetail: movieDetail,
    //   message: theMSG
    // };

    res.render('movies/details', {movieDetail});
  }).catch(err => next(err));
});


router.post('/delete/:movieId', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
  .then(() => {
    res.redirect('/movie/list');
  }).catch(err => next(err));
});


module.exports = router;
