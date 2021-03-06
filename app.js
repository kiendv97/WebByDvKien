var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var {mongoURI} = require('./config/key');
var mongoose = require('mongoose');
var passport = require('passport');
var csrf = require('csurf');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cartRouter = require('./routes/cart');
var adminRouter = require('./routes/admin/admin');
var loginAdmin = require('./routes/admin/login');
var productModel = require('./models/product');
var userModel = require('./models/user');
var articleModel = require('./models/article');
var bodyParser = require('body-parser')
var flash = require('connect-flash');
var validator = require('express-validator');
var multer = require('multer');
var paginate = require('express-paginate');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload');
    },
    filename: function(req,file , cb){
        cb(null,  Date.now() + '-' + file.originalname);
    }
})
var upload = multer({storage: storage});
var app = express();

productModel
userModel
require('./config/passport');

mongoose.connect(mongoURI(), {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connect to Server Success');

  })
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(validator());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/')));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.admin = req.admin || null;
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  
  next();
});
app.use(paginate.middleware(10,50));
app.use(upload.any());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/admin/auth',loginAdmin);
app.use('/admin', adminRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
