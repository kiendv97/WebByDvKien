var express = require('express');
var router = express.Router();
var passport = require('../../config/passport');
const Product = require('../../models/product');
const Order = require('../../models/order');
const Cate = require('../../models/cate');
const Article = require('../../models/article');
var { isLogInUser, isLoginAdmin } = require('../../config/authentication');
var csrf = require('csurf');

router.use(isLoginAdmin);
router.get('/', (req, res, next) => {
    res.render('admin/main/index', { success_msg: req.flash('success') });;
});



//process article 
router.get('/article/danh-sach.html', (req, res, next) => {
    Article.find({})
        .then(articles => {
            res.render('admin/article/danhsach', { success_msg: req.flash('message'), product: articles });
        })
});
router.get('/article/them-article.html', (req, res, next) => {

    res.render('admin/article/them', { success_msg: req.flash('message'), errors: req.flash('errors') })


});
router.get('/article/:id/xoa-article.html', async (req, res, next) => {
    await Article.findByIdAndRemove(req.params.id)

    res.redirect('/admin/article/danh-sach.html');




});
router.get('/article/:id/sua-article.html', async (req, res, next) => {
    await Article.findById(req.params.id)
        .then(artice =>{
            res.render('admin/article/sua',{
        success_msg: req.flash('message'),
        errors: req.flash('error'),
        article : artice

    });
        });

  




});
router.post('/article/:id/sua-article.html', async (req, res, next) => {
    var tags = req.body.tags;
    var tags1 = [];
    tags1 = tags.toString().split(',');
    console.log(req.files[0]);;
    
    if(req.files[0] ){
         await Article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        img: req.files[0].path,
        des: req.body.des,
        cate: req.body.cate,
        tags: tags1
    })
    } 
    else {
        await Article.findByIdAndUpdate(req.params.id,{ $set:{
            title: req.body.title,
          
            des: req.body.des,
            cate: req.body.cate,
            tags: tags1
        }}) 
    }
   

    res.redirect('/admin/article/danh-sach.html');




});
router.post('/article/them-article.html', (req, res, next) => {
    var tags = req.body.tags;
    var tags1 = [];
    tags1 = tags.toString().split(',');


    var newArticle = {
        title: req.body.title,
        img: req.files[0].path,
        des: req.body.des,
        cate: req.body.cate,
        tags: tags1
    }

    new Article(newArticle)
        .save()
        .then(article => {
            res.redirect('/admin/article/danh-sach.html');
        })


});
// Process Categories
router.get('/cate/danh-sach.html', (req, res, next) => {
    Cate.find({}, (err, datas) => {
        res.render('admin/cate/danhsach', { data: datas, success_msg: req.flash('success') });

    })
});
router.post('/cate/them-cate.html', (req, res, next) => {
    var newCate = {
        name: req.body.name
    };
    new Cate(newCate)
        .save()
        .then(cate => {
            res.redirect('/admin/cate/danh-sach.html');
        });
});
router.get('/cate/:id/sua-cate.html', (req, res, next) => {
    Cate.findById(req.params.id)
        .then(cate => {
            res.render('admin/cate/sua', { success_msg: req.flash('success'), errors: req.flash('error'), data: cate });
        })
});
router.post('/cate/:id/sua-cate.html', (req, res, next) => {
    Cate.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } })
        .then(cate => {
            res.redirect('/admin/cate/danh-sach.html');

        })
});
router.get('/cate/them-cate.html', csrf(), (req, res, next) => {
    res.render('admin/cate/them', { errors: req.flash('message'), csrfToken: req.csrfToken(), success_msg: req.flash('success') });
});
// Process all product 
router.get('/product/danh-sach.html', (req, res, next) => {
    Product.find({}, (err, results) => {

        res.render('admin/product/danhsach', { product: results, success_msg: req.flash('success') });

    })
});

router.get('/product/them-product.html', csrf(), (req, res, next) => {

    Cate.find({})
        .then(cates => {
            res.render('admin/product/them', { errors: req.flash('error'), csrfToken: req.csrfToken(), success_msg: req.flash('success'), cate: cates });

        })
});
router.post('/product/them-product.html', (req, res, next) => {
    console.log(req.files);
    var newProduct = {
        title: req.body.title,
        cateId: req.body.cate,
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
router.post('/product/:id/sua-product.html', (req, res, next) => {
    var id = req.params.id;
    console.log(req.files);

    Product.findByIdAndUpdate(id, {
        $set: {
            title: req.body.name,
            cate: req.body.cate,
            img: req.files[0].path,
            des: req.body.des,
            price: req.body.gia
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
router.get('/product/:id/sua-product.html', csrf(), (req, res, next) => {
    Product.findOne({ _id: req.params.id }, (err, product) => {
        Cate.find({})
            .then(cates => {
                res.render('admin/product/sua', { csrfToken: req.csrfToken(), cate: cates, success_msg: req.flash('success'), errors: req.flash('error'), product: product });

            })

    })
})
router.get('/cart/danh-sach.html', (req, res, next) => {
    Order.find({}, (err, results) => {
        res.render('admin/cart/danhsach', { data: results, success_msg: req.flash('message') });

    })
});
// Order Process
router.get('/cart/:id/xoa-cart.html', (req, res, next) => {
    Order.findOneAndRemove({ _id: req.params.id })
        .then(result => {
            console.log(result);

            res.redirect('/admin/cart/danh-sach.html');

        })
})
router.get('/cart/:id/xem-cart.html', (req, res, next) => {
    Order.findOne({ _id: req.params.id })
        .populate({
            path: 'product'
        })
        .then(order => {
            res.render('admin/cart/view', { success_msg: req.flash('message'), cart: order })
        })
});

router.get('/cart/:id/thanh-toan-cart.html', (req, res, next) => {
    Order.findOneAndUpdate({ _id: req.params.id }, { $set: { st: 1 } })
        .then(result => {
            req.flash('message', ' Pay Success');
            res.redirect(`/admin/cart/${result._id}/xem-cart.html`);
        })
})
// Get User
router.get('/getuser', function (req, res) {
    res.json(req.user);
});





module.exports = router;    
