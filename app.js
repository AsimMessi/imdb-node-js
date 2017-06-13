var http = require("http"),
    path = require('path')
    fs = require("fs");
    //colors = require('colors');
var mongoose=require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs =require('express-handlebars');
var hbs = require('hbs');
var session = require('express-session');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var express=require(express);

var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

var app = express();
app.use(session({secret: "blekh", resave: false, saveUninitialized: true}));

app.engine('.hbs',expressHbs({defaultLayout:'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
// app.use('/',express.static(_dirname + '/'));

var index = require('./routes/index');

var userRoutes = require('./routes/users');
/*app.get('/signup.htm', function (req, res) {
   res.sendFile( __dirname + "/views/" + "signup.htm" );
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('body-parser')());
var urlbodyparser=bodyParser.urlencoded({ extended: false });
//app.use(flash());
app.use(passport.initialize());

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/imdb');

//app.use('/signup', signUp);


app.use('/user', userRoutes);
app.use('/', index);



/*
app.get('/rate-movie', function(req,res,next)
{
    var movieid=req.params.idm;
    var user=req.params.idu;
    console.log("aagya kabu");

});*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;