var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var { isLogIn } = require('../config/authentication');
router.use(csrf());
/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.render('signup', { message: req.flash('message'), csrfToken: req.csrfToken() })
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/users/login',
  failureRedirect: '/users/signup',
  failureFlash: true
}))

router.get('/login', function (req, res, next) {
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
  res.redirect('/home-02.html');
})
module.exports = router;