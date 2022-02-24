const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa')
//Constants
const helmet = require('helmet');
const cors = require('cors');
const body_parser = require('body-parser');

require('dotenv').config(); // This middleware allows the server to access ".env" files locally.
//Auth stuff
//Authentication Handling
let authURI = process.env.jwksURI;
let authAudience = process.env.jwtAudience;
let authIssuer = process.env.JWT_ISSUER;

const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: authURI
  }),
  audience: authAudience,
  issuer: authIssuer,
  algorithms: ['RS256']
})
//app.use(checkJWT)

//Routes
let indexRouter = require('./routes/index');
let statusRouter = require('./routes/status')
//let usersRouter = require('./routes/users');

//API Routes
let airbnbRouter = require('./routes/airbnb');
let analyticsRouter = require('./routes/analytics');
let geospatialRouter = require('./routes/geospatial');
let mflixRouter = require('./routes/mflix');
let restaurantsRouter = require('./routes/restaurants');
let suppliesRouter = require('./routes/supplies');
let trainingRouter = require('./routes/training');
let weatherRouter = require('./routes/weather');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Assorted Middleware
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(body_parser.json());;
app.use(cors());


//Routes
app.use('/', indexRouter);
//app.use('/users', usersRouter);



//REST API Routes
app.use('/api/v1/airbnb', checkJWT, airbnbRouter);
app.use('/api/v1/status', checkJWT,statusRouter);
// Potential future API Endpoints
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/geospatial', geospatialRouter);
app.use('/api/v1/mflix', mflixRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/supplies', suppliesRouter);
app.use('/api/v1/training', trainingRouter)
app.use('/api/v1/weather', weatherRouter);

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
