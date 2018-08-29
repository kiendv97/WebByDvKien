const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const csrf = require('csurf');


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
      
      
      
  });

  module.exports = router;