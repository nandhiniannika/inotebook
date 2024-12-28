const express = require('express');
const cors = require('cors'); // Import the cors package

require('dotenv').config({ path: '.env.local' });
const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT;

connectToMongo();

app.use(cors()); // Use CORS middleware
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Inotebook backend - https://inotebook-3-6ooa.onrender.com`);
});