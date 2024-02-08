const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const conn = process.env.MONGO_URI;

const connection = mongoose.createConnection(conn, {
    // Options for the connection
});

// Log a success message if the connection is successful
connection.once('open', () => {
    console.log('Database connection successful');
});


// Expose the connection
module.exports = connection;