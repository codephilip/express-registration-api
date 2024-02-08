const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const bodyParser = require('body-parser');
const { middleware1 } = require('./middleware/middleware1')

//const connectToMongoDB = require('./db');
const app = express();

const dbString = process.env.MONGO_URI;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connection = mongoose.createConnection(dbString, dbOptions);

//global middlware
app.use(express.json)
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(middleware1);
app.use(middleware2);


//const sessionStore = new MongoStore({
//  mongooseConnection: connection,
//  collection: 'users'
//});

app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// app.use(session({
//   secret: 'some secret',
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24
//   }
// }));

function errorHandler(err, req, res, next) {
  res.json({ err: err })
};


app.get('/', (req, res, next) => {
  console.log('I am standard express function.')
  res.send(`<h1>Success! CustomProp: ${req.customProp}</h1>`)

});

// function middleware1(req, res, next) {
//   req.customProp = 100;
//   console.log('middleware1');
//   console.log(`custom prop: ${req.customProp}`)
//   next();
// }

function middleware2(req, res, next) {
  console.log('middleware2');
  req.customProp = 600;
  console.log(`custom prop: ${req.customProp}`)
  const newErr = new Error('its a Error.')
  next(newErr);
}

// function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
//   console.log('standardExpressCallback');
//   responseObject.send('<h1>Success!!</h1>');
// }

//db connection
//connectToMongoDB();

//global errorhandler
app.use(errorHandler);

app.listen(3001);






























// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// // Database (replace with your own database implementation)
// const users = [];

// // Registration endpoint
// app.post('/register', (req, res) => {
//     const { username, password } = req.body;

//     // Check if user already exists
//     const existingUser = users.find(user => user.username === username);
//     if (existingUser) {
//         return res.status(409).json({ message: 'Username already exists' });
//     }

//     // Create new user
//     const newUser = { username, password };
//     users.push(newUser);

//     return res.status(201).json({ message: 'User registered successfully' });
// });

// // Login endpoint
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Check if user exists
//     const user = users.find(user => user.username === username);
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Check if password is correct
//     if (user.password !== password) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     return res.status(200).json({ message: 'Login successful' });
// });

// // Start the server
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
