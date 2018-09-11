var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var csrf = require('csurf');
var mongoose = require('mongoose');
var productModel = require('../models/product');
var CateModel = require('../models/cate');
var Article = require('../models/article');
var userModel = require('../models/user');
/* GET home page. */
router.get('/', function (req, res, next) {
  productModel.find({})
    .then(products => {
      Article.find({}).limit(3)
        .then(articles => {
          res.render('index', { articles: articles, products: products, productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), title: 'Home  ', message: req.flash('message') });

        })

    })
});

router.get('/index.html', function (req, res, next) {
  res.redirect('/')
});

/* GET about page. */
router.get('/about.html', function (req, res, next) {
  res.render('about', { productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), title: 'About', message: req.flash('message') });
});
router.get('/blog.html', function (req, res, next) {
  res.redirect('/blog.html.page=1');
});
router.get('/blog.html.page=:page', async function (req, res, next) {
  var perPage = 3;
  var page = req.params.page || 1;
  const [results, count] = await Promise.all([
    Article.find({}).limit(perPage).skip((perPage * page) - perPage).lean().exec(),
    Article.countDocuments()

  ]);

  var countPage = Math.ceil(count / perPage);
  res.render('blog', { articles: results, current: page, pages: countPage, productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), title: 'Blog', message: req.flash('message') });


});
router.get('/blog.html.cate=:name', (req, res, next) => {



  Article.find({ cate: req.params.name })
    .then(datas => {
      res.render('blog', {
        current: 1,
        pages: 1, articles: datas, productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), title: 'Blog', message: req.flash('message')
      });

    })
});
router.post('/postcomment',(req,res,next)=>{
 
  
  
      var newComment = {
        cmt : req.body.comment,
        name : req.body.name,
        email: req.body.email
      };
      Article.findByIdAndUpdate(req.body.id,{$push:{comment : newComment }})
       
        .then( article =>{
          console.log(article);
          
          res.json(article);
        })

});
router.get('/blog-detail.html.:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then(datas => {
      Article.find({})
        .then(articles => {
          res.render('blog-detail', { articles: articles, article: datas, productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), title: 'Blog', message: req.flash('message') });

        })


    })
})



router.get('/cart.html', csrf(), function (req, res, next) {
  console.log(req.body.numproduct2);

  if (!req.session.cart) {
    res.render('cart', { productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), message: req.flash('message'), title: ' Cart', products: null, csrfToken: req.csrfToken() });
  } else {
    res.render('cart', { productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), message: req.flash('message'), title: ' Cart', csrfToken: req.csrfToken(), products: new Cart(req.session.cart ? req.session.cart : {}).generateArray() });
  }




});


router.get('/contact.html', function (req, res, next) {
  res.render('contact', { productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(), title: 'Contact', message: req.flash('message') });

})

router.get('/home-02.html', function (req, res, next) {
  res.render('home-02', { title: ' Home -2 ' });

})

router.get('/home-03.html', function (req, res, next) {
  res.render('home-03', { title: ' Home -3' });

});
router.post('/searchProduct', async (req, res, next) => {


  var x = req.body.input.toString().toLowerCase();
  var array = [];
  await productModel.find({})
    .then(products => {


      products.forEach((product) => {
        if (product.title.toString().toLowerCase().search(x) != -1) {
          array.push(product);
        }
      });

    });


  res.json(array);
});
router.post('/filterProduct', async (req, res, next) => {


  var x = req.body.input.toString().toLowerCase();
  var array = [];
  await productModel.find({})
    .then(products => {


      products.forEach((product) => {
        if (product.title.toString().toLowerCase().search(x) != -1) {
          array.push(product);
        }
      });

    });


  res.json(array);
});
router.get('/product.html.orderbyPrice=rise.page=:page', async (req, res, next) => {
  var perPage = 6;
  var page = req.params.page || 1;
  const [results, itemCount, cates] = await Promise.all([
    productModel.find({}).limit(perPage).skip((perPage * page) - perPage).lean().sort({ price: 1 }).exec(),
    productModel.countDocuments(),
    CateModel.find({})
  ]);


  const pageCount = Math.ceil(itemCount / perPage);
  res.render('product', {
    productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(),
    title: ' Product', products: results, message: req.flash('error'),
    current: page,
    pages: pageCount,
    cates: cates

  });
});
router.get('/product.html.orderbyPrice=low.page=:page', async (req, res, next) => {
  var perPage = 6;
  var page = req.params.page || 1;
  const [results, itemCount, cates] = await Promise.all([
    productModel.find({}).limit(perPage).skip((perPage * page) - perPage).lean().sort({ price: -1 }).exec(),
    productModel.countDocuments(),
    CateModel.find({})
  ]);


  const pageCount = Math.ceil(itemCount / perPage);
  res.render('product', {
    productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(),
    title: ' Product', products: results, message: req.flash('error'),
    current: page,
    pages: pageCount,
    cates: cates

  });
});
router.get('/product.html', (req, res, next) => {
  res.redirect('/product.html.page=1');
})
router.get('/product.html.page=:page', async function (req, res, next) {
  var perPage = 6;
  var page = req.params.page || 1;
  const [results, itemCount, cates] = await Promise.all([
    productModel.find({}).limit(perPage).skip((perPage * page) - perPage).lean().exec(),
    productModel.countDocuments(),
    CateModel.find({})
  ]);


  const pageCount = Math.ceil(itemCount / perPage);
  res.render('product', {
    productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(),
    title: ' Product',
    products: results,
    message: req.flash('error'),
    current: page,
    pages: pageCount,
    cates: cates

  });



});
router.get('/product.html.sort=:cate', async function (req, res, next) {
  var perPage = 6;
  var page = req.params.page || 1;
  var cate = req.params.cate || 'Dress';
  cate.trim();
  var cateId = await CateModel.findOne({ name: cate });
  console.log(cateId);

  const [results, itemCount, cates] = await Promise.all([
    productModel.find({ cateId: cateId._id }).exec(),
    productModel.countDocuments(),
    CateModel.find({})
  ]);


  const pageCount = Math.ceil(itemCount / perPage);
  res.render('product', {
    productCart: new Cart(req.session.cart ? req.session.cart : {}).generateArray(),
    title: ' Product', products: results, message: req.flash('error'),
    current: 1,
    pages: 1,
    cates: cates

  });



});
router.get('/product-detail.html.:id', function (req, res, next) {


  productModel.findById(req.params.id)
    .then(product => {
      console.log(product);

      res.render('product-detail', { title: ' Product-Detail', product: product, relateProduct: new Cart(req.session.cart ? req.session.cart : {}).generateArray() });

    })

});

module.exports = router;
