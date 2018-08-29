var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var csrf = require('csurf');
var mongoose = require('mongoose');
var productModel = require('../models/product');
var userModel = require('../models/user');

router.use(csrf());
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home  ' });
});

router.get('/index.html', function (req, res, next) {
  res.render('index', { title: 'Home  ' });
});

/* GET about page. */
router.get('/about.html', function (req, res, next) {
  res.render('about', { title: 'About' });
});
router.get('/blog.html', function (req, res, next) {
  res.render('blog', { title: 'Blog' });
})

router.get('/blog-detail.html', function (req, res, next) {
  res.render('blog-detail', { title: ' Blog-Detail' });

})

router.get('/cart.html', function (req, res, next) {
  console.log(req.body.numproduct2);
  
  if (!req.session.cart) {
    res.render('cart', { title: ' Cart', products: null, csrfToken : req.csrfToken() });
  } else {
    res.render('cart', { title: ' Cart', csrfToken : req.csrfToken(), products: new Cart(req.session.cart ? req.session.cart : {}).generateArray() });
  }




})


router.get('/contact.html', function (req, res, next) {
  res.render('contact', { title: ' Contact' });

})

router.get('/home-02.html', function (req, res, next) {
  res.render('home-02', { title: ' Home -2 ' });

})

router.get('/home-03.html', function (req, res, next) {
  res.render('home-03', { title: ' Home -3' });

})

router.get('/product.html', function (req, res, next) {
  productModel.find()
    .then(products => {
      res.render('product', { title: ' Product', products: products });
    })


})
router.get('/product-detail.html', function (req, res, next) {
  res.render('product-detail', { title: ' Product-Detail' });

});
//Add to card 
router.get('/addtocart/:id', function (req, res, next) {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  productModel.findById(id, (err, product) => {
    if (err) {

    }
    cart.add(product, product.id);  
    req.session.cart = cart;
    console.log(req.session.cart);
    setTimeout(() => {
      res.redirect('/product.html');
    }, 1000)


  })
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.delete(id);
  req.session.cart = cart;
  res.redirect('/cart.html');
   
  
  

});

router.post('/update', function (req, res, next) {


  
   var cart = new Cart(req.session.cart ? req.session.cart : {});
    var qty = req.body.itemQty;  
    var id = req.body.productId;
    cart.update(id,qty);
    req.session.cart = cart;
     res.redirect('/cart.html')
    
    
    
})
module.exports = router;
