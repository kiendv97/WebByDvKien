var express  = require('express');
var router = express.Router();
var passport = require('../../config/passport');

router.get('/', (req,res,next)=>{
    res.render('admin/main/index');
});

router.get('/dang-nhap.html', (req,res,next)=>{
    res.render('admin/login/index', {error : req.flash('message')});
})
router.post('/login', passport.authenticate('local.login',{
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
}));
 
router.get('/dang-xuat.html',(req,res,next)=>{
    req.logout();
    res.redirect('/admin/login');
});

router.get('/cate/danh-sach.html',(req,res,next)=>{
        res.render('admin/cate/danhsach', {data : [1234,123]});
});

router.get('/cate/them-cate.html',(req,res,next)=>{
    res.render('admin/cate/them',{errors : req.flash('message')});
});

router.get('/product/danh-sach.html',(req,res,next)=>{
        res.render('admin/product/danhsach',{product : [12,12]})
});

router.get('/product/them-product.html',(req,res,next)=>{
    res.render('admin/product/them', {errors : req.flash('message'), cate : [12,123]})
});

router.get('/cart/danh-sach.html',(req,res,next)=>{
    res.render('admin/cart/danhsach',{data : [12]})
});
router.get('/getuser', function (req, res) {
    res.json(req.admin);
});





module.exports = router;    
