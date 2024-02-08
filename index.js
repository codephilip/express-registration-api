const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const { middleware1 } = require('./middleware/middleware1');

const passport = require('passport');
const crypto = require('crypto');
// Assuming middleware2 is defined elsewhere or uncomment its definition below

const app = express();
const dbString = process.env.MONGO_URI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(dbString, dbOptions); // Connect using mongoose directly

// Middleware
app.use(express.json()); // Corrected
app.use(express.urlencoded({ extended: true })); // Corrected
app.use(bodyParser.json());
app.use(middleware1);
// app.use(middleware2); // Uncomment if middleware2 is defined

app.use(session({
  secret: 'some secret', // This should be a random secret for production
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: dbString, collectionName: 'users' }), // Corrected to use MongoStore.create
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Example: 24 hours
  }
}));

app.get('/', (req, res, next) => {
  console.log('hi')
  console.log(req.session);

  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1
  }

  res.send(
    `<h1>hello</h1>
      <h2>You have visted ${req.session.viewCount} times</h2>`
  )

})

// Routes and error handler...

// Example middleware2, uncomment or ensure it's defined elsewhere
// function middleware2(req, res, next) {
//   console.log('middleware2');
//   req.customProp = 600;
//   console.log(`custom prop: ${req.customProp}`);
//   const newErr = new Error('its a Error.');
//   next(newErr);
// }

// Start server
app.listen(3001, () => console.log('Server running on port 3001'));

