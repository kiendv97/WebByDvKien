const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
router.get('/dang-nhap.html',csrf(),  (req, res, next) => {
    res.render('admin/login/index', { error: req.flash('message'), csrfToken: req.csrfToken() });
});
router.post('/dang-nhap.html', passport.authenticate('local.login2', {
    successRedirect: '/admin',
    failureRedirect: '/admin/auth/dang-nhap.html',
    failureFlash: true
}));
router.get('/dang-xuat.html', (req, res, next) => {
    req.logout();
    req.flash('message','Failed login');
    res.redirect('/admin/auth/dang-nhap.html');
});
module.exports = router;