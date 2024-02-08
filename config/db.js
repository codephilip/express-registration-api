const mongoose = require('mongoose');
//const User = require('../models/User');
require('dotenv').config();

const conn = process.env.MONGO_URI;

const connection = mongoose.createConnection(conn, {
    // Options for the connection
});

// Log a success message if the connection is successful
connection.once('open', () => {
    console.log('Database connection successful');
});


// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});


const User = connection.model('User', UserSchema);


// Expose the connection
module.exports = connection;