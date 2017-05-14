const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.send('signup');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/documents');
    });
  });
});

router.get('/signin', function(req, res) {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local', { successRedirect: '/documents', failureRedirect: '/signin' }), function(req, res) {
});

router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
