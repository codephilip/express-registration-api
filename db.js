// const mongoose = require('mongoose');
// const session = require('express-session')
// //MongoStore
// const MongoStore = require('connect-mongo');

// async function connectToMongoDB() {
//   const uri = process.env.MONGO_URI; // Replace with your MongoDB connection string
//   const dbOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
//   const connection = mongoose.createConnection(uri, dbOptions)

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const database = client.db('express-registration-api'); // Replace with your database name

//     // Perform database operations here

//   } catch (error) {
//     console.error('Error connecting to MongoDB', error);
//   } finally {
//     await client.close();
//     console.log('Disconnected from MongoDB');
//   }
// }

// module.exports = connectToMongoDB;
