var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var { isLogIn } = require('../config/authentication');
/* GET users listing. */
router.get('/signup',csrf(), function (req, res, next) {
  res.render('signup', { message: req.flash('message'), csrfToken: req.csrfToken() })
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/users/signup',
  failureFlash: true
}))

router.get('/login', csrf(),function (req, res, next) {
  if (req.user) {
    res.redirect('/');
  }
  res.render('login', { message: req.flash('message'), csrfToken: req.csrfToken() });
})

router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  req.logout();
  res.redirect('/');
})
module.exports = router;
