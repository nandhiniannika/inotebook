const mongoose = require('mongoose');

// Connection URI to MongoDB
const mongoURI = 'mongodb://localhost:27017/inotebook';

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        // Connect to MongoDB using the URI and additional options for timeouts
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,    // Use new parser for MongoDB URLs
            useUnifiedTopology: true, // Use the new server discovery and monitoring engine
            socketTimeoutMS: 45000,   // Increase socket timeout (default is 30000ms)
            serverSelectionTimeoutMS: 5000, // Increase server selection timeout
            autoIndex: false          // Temporarily disable autoIndex during startup (optional)
        });

        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
