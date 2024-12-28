// Connection URI to MongoDB (from .env file)
const mongoURI = process.env.MONGO_URI;
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define the connection function
const connectToMongo = async () => {
    const mongoURI = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 5000,
            autoIndex: false,
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Export the function
module.exports = connectToMongo;
