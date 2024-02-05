const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
    const uri = process.env.MONGO_URI; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('c'); // Replace with your database name

        // Perform database operations here

    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = connectToMongoDB;