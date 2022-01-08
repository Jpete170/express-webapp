const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Constants
const helmet = require('helmet')
const cors = require('cors')
const body_parser = require('body-parser')
require('dotenv').config(); // This middleware allows the server to access ".env" files locally.
//const pug = require('pug')
//Routes
let indexRouter = require('./routes/index');
//let usersRouter = require('./routes/users');
let airbnbRouter = require('./routes/airbnb')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Assorted Middleware
app.use(helmet())
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.json())

app.use(cors())

//Routes
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/airbnb', airbnbRouter)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404', {title: "Error 404 Occurred"})
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
