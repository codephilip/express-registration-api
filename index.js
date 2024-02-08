const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const routes = require('./routes/routes');
const connection = require('./config/db');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const csurf = require('csurf');
const flash = require('connect-flash');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

var app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "example.com"],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },
//   },
// }));
app.use(cors()); // Configure as needed for your environment
app.use(morgan('dev')); // 'dev' for development, 'common' for production
app.use(compression());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Passport authentication
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); // After session middleware
app.use(csurf({ cookie: true })); // CSRF protection

// Global middleware to make the flash messages and CSRF token available to all templates
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Logging middleware to console log the session and user details
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// Routes
app.use(routes);

// Server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));