const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const csrf = require('csurf');
const Order = require('../models/order');
const Guess = require('../models/guess');
var mongoose = require('mongoose');
var productModel = require('../models/product');
var userModel = require('../models/user');
var orderModel = require('../models/order');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
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
    cart.update(id, qty);
    req.session.cart = cart;
    res.redirect('/cart.html')



});
// Check out 
router.post('/checkout', (req, res, next) => {
    if (!req.session.cart) {
        req.flash('error', 'dont success');
        return res.redirect('/product.html');
    };

    process();
    async function process() {
        var items = req.session.cart.items;


        var product = [];

        
            for (const id in items) {
              await  productModel.findById(id, (err, pro) => {
                    if (!err) {

                        for (let index = 0; index < items[id].qty; index++) {
                            product.push(pro)
                        }
                    }
                }
                )
            };
            console.log(product);

        
        

        var order = {
            name: req.body.name || 'NoName',
            address: req.body.address || 'NoAddress',
            phone: req.body.phone || 00000,
            totalPrice: req.session.cart.totalPrice,
            product: product
        }
        new orderModel(order)
            .save()
            .then(order => {


                req.session.cart = null;
                req.flash('message', 'Youve successly  bought ');
                res.redirect('/');
            })
    }





})
module.exports = router;