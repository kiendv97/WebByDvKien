var express = require('express');
var router = express.Router();
var passport = require('../../config/passport');
const Product = require('../../models/product');
const Cate = require('../../models/cate');
var { isLogInUser, isLoginAdmin } = require('../../config/authentication');
var csrf = require('csurf');

router.use(csrf());

router.get('/', isLoginAdmin, (req, res, next) => {
    res.render('admin/main/index', { success_msg: req.flash('success') });;
});

router.get('/dang-nhap.html', (req, res, next) => {
    res.render('admin/login/index', { error: req.flash('message'), csrfToken: req.csrfToken() });
})
router.post('/login', passport.authenticate('local.login2', {
    successRedirect: '/admin',
    failureRedirect: '/admin/dang-nhap.html',
    failureFlash: true
}));

router.get('/dang-xuat.html', (req, res, next) => {
    req.logout();
    res.redirect('/admin/dang-nhap.html');
});
// Process Categories
router.get('/cate/danh-sach.html', (req, res, next) => {
    Cate.find({}, (err, datas) => {
        res.render('admin/cate/danhsach', { data: datas, success_msg: req.flash('success') });

    })
});
router.post('/cate/them-cate.html',(req,res,next)=>{
    var newCate = {
        name : req.body.name
    };
    new Cate(newCate)
        .save()
        .then( cate =>{
            res.redirect('/admin/cate/danh-sach.html');
        }); 
});
router.get('/cate/them-cate.html', (req, res, next) => {
    res.render('admin/cate/them', { errors: req.flash('message'),csrfToken : req.csrfToken() , success_msg: req.flash('success')});
});
// Process all product 
router.get('/product/danh-sach.html', (req, res, next) => {
    Product.find({}, (err, results) => {
 
        res.render('admin/product/danhsach', { product: results, success_msg: req.flash('success') });

    })
});

router.get('/product/them-product.html', (req, res, next) => {
    Cate.find({})
        .then(cates => {
            res.render('admin/product/them', { errors: req.flash('error'), csrfToken: req.csrfToken() , success_msg: req.flash('success'), cate: cates});

        })
});
router.post('/product/them-product.html', (req, res, next) => {
    console.log(req.body);
    var newProduct = {
        title: req.body.title,
        cate: req.body.cateId,
        img: req.files[0].path,
        des: req.body.des,
        price: req.body.price

    }
    new Product(newProduct)
        .save()
        .then(data => {
            console.log('insert product success');
            req.flash('success_msg', 'OK Server saved')
            res.redirect('/admin/product/danh-sach.html');
        });

});
router.post('/product/:id/sua-product', (req, res, next) => {
    var id = req.params.id;
    Product.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            cate: req.body.cateId,
            img: req.files[0].path,
            des: req.body.des,
            price: req.body.price
        }
    }, (err, result) => {
        console.log('success update this product');
        req.flash('success_msg', 'Update successly')
        res.redirect('/admin/product/danh-sach.html');

    });
})
router.get('/product/:id/xoa-product.html', (req, res, next) => {
    var id = req.params.id;
    Product.findOneAndRemove({ _id: id })
        .then(result => {
            console.log(result);
            res.redirect('/admin/product/danh-sach.html');

        })
})
router.get('/product/:id/sua-product.html', (req, res, next) => {
    Product.findOne({ _id: req.params.id }, (err, product) => {
        Cate.find({})
            .then(cates => {
                res.render('admin/product/sua', { cate: cates, success_msg: req.flash('success'), errors: req.flash('error'), product: product });

            })

    })
})
router.get('/cart/danh-sach.html', (req, res, next) => {

    res.render('admin/cart/danhsach', { data: [12] })
});
router.get('/getuser', function (req, res) {
    res.json(req.admin);
});





module.exports = router;    
