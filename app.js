const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const winston = require('./config/winston');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const Details = require('./routes/details');
const Home = require('./routes/home');

const app = express();

// Database Connection
const mon = require('./config/database');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

app.use(morgan('combined', { stream: winston.stream }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session configuration
app.use(session({
  secret: 'keyboard-cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', Home);
app.use('/details', Details);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
