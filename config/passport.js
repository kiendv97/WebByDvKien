var passport = require('passport');
var LocalStratery = require('passport-local').Strategy;
var User = require('../models/user');
var Admin = require('../models/admin');


passport.serializeUser(function (user, done) {
    done(null, user.id);
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(null, user);
    });
});
// Sign up 
passport.use('local.signup', new LocalStratery({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},


    function (req, email, password, done) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
      
        if (req.validationErrors()) {


            var message = [];
            req.validationErrors.forEach(function (me) {
                message.push(me.msg);
            })
            done(null, false, req.flash('message', message))
        }
        User.findOne({ 'email': email }, function (err, user) {
            if (err) return done(err);
            if (user) {
                return done(null, false, req.flash('message', 'Email id already in use'));
            }

            if (password.length < 4) {
                return done(null, false, req.flash('message', 'Password least 4 characters'));
            }
            if (password.toString() !== req.body.password2.toString()) {
                return done(null, false, req.flash('message', 'Password confirms  exactly'))
            }

            var newUser = new User({
                email: email,
                password: password,
                fullname: req.body.name,
                phone: req.body.phone,
                address: req.body.address
            });
            newUser.save(function (err, result) {
                if (err) return done(err);

                return done(null, newUser);

            });
        })
    }
));

// passport log in 

passport.use('local.login', new LocalStratery({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
        console.log('helo');
        if (req.validationErrors()) {
            var error  = req.validationErrors();

            var message = [];
           Array.prototype.forEach.call(error,function(me){
               message.push(me.msg);
           })

             return done(null, false, req.flash('message', message))
        }
        User.findOne({ email: email }, function (err, user) {
            if (user) {
                if (password !== user.password) {

                    return done(null, false, req.flash('message', 'Password incorrect'))
                }
                return done(null, user);
            }

            else {
                return done(null, false, req.flash('message', 'User  incorrect'))
            }

        })
    }
));

passport.use('local.login2', new LocalStratery({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, email, password, done) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
        console.log('helo');
        if (req.validationErrors()) {
            var error  = req.validationErrors();

            var message = [];
           Array.prototype.forEach.call(error,function(me){
               message.push(me.msg);
           })

             return done(null, false, req.flash('message', message))
        }
        Admin.findOne({ email: email }, function (err, admin) {
            if (admin) {
                if (password !== user.password) {

                    return done(null, false, req.flash('message', 'Password incorrect'))
                }
                return done(null, admin);
            }

            else {
                return done(null, false, req.flash('message', 'Admin  incorrect'))
            }

        })
    }
))
module.exports = passport;