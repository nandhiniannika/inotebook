const mongoose = require('mongoose');

// Connection URI to MongoDB
const mongoURI ='mongodb://localhost:27017/inotebook';

// Function to connect to MongoDB
const connectToMongo = async () => {
 
    // Connect to MongoDB using the URI
    mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
};

module.exports = connectToMongo;

