var express  = require('express');
var router = express.Router();
var passport = require('../../config/passport');

router.get('/', (req,res,next)=>{
    res.render('admin/main/index');
});

router.get('/login', (req,res,next)=>{
    res.render('admin/login/index', {error : req.flash('message')});
})
router.post('/login', passport.authenticate('local.login',{
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));

router.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/admin/login');
})
module.exports = router;