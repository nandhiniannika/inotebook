const express = require('express');
const cors = require('cors'); // Import the cors package
const connectToMongo = require('./db');

const app = express();
const port = 5000;

connectToMongo();

app.use(cors()); // Use CORS middleware
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Inotebook backend - http://localhost:${port}`);
});