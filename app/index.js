// Require statements:
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const databaseConnection = require('./utils/connect-local-mongodb');

// Invoke the express app module functionality:
const app = express();

// Import routes:
const authRouter = require('./routes/auth');
const foodItemRouter = require('./routes/food-item');

// Mount router:
app.use('/', authRouter);
app.use('/', foodItemRouter);

// Root route test:
app.get('/', (req, res) => {
    res.json({ "response": "This is the root" });
    res.status(200);
})

//Connect to db and check status: 
databaseConnection.makeLocalDBConnection();
databaseConnection.checkDBConnectionStatus();

// Middleware:
app.use(bodyParser.json());
app.use(cors());

// Export for use in server.js
module.exports = { app };