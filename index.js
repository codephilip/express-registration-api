const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const connectToMongoDB = require('./db');

const app = express();

//global middlware
app.use(bodyParser.json());
app.use(middleware1);
app.use(middleware2);

function errorHandler(err, req, res, next) {
  if (err) {
    res.send('<h1>Error here</h1>');
  }
};

app.get('/', (req, res, next) => {
  console.log('I am standard express function.')
  res.send('<h1>Success!</h1>')
});

function middleware1(req, res, next) {
  console.log('middleware1');
  next();
}

function middleware2(req, res, next) {
  console.log('middleware2');
  const objErr = new Error('tragic error.');
  next(objErr);
}

// function standardExpressCallback(requestObject, responseObject, nextMiddleware) {
//   console.log('standardExpressCallback');
//   responseObject.send('<h1>Success!!</h1>');
// }

//db connection
connectToMongoDB();

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
