// Require statements:
const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

// Invoke the express app module functionality
const app = express();

// Import routes:
const authRouter = require('./routes/auth');

// Mount router:
app.use('/', authRouter);

// Root route test:
app.get('/', (req, res) => {
    res.json({ "response": "This is the root" })
    res.status(200);
})

mongoose.set('strictQuery', true); // this and second param in .connect() below prevent deprecation warnings
const mongoDBLocalURL = process.env.MONGODB_LOCAL_URL;
mongoose.connect(
    mongoDBLocalURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log('Connected to MongoDB:', mongoose.connection.name, 'on port', mongoose.connection.port); // -> check db connection is working
    }
)


module.exports = { app }