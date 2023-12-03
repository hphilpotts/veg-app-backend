const express = require("express");
const app = express();

const authRouter = require('./routes/auth');
const foodsRouter = require('./routes/foods');
const weekRouter = require('./routes/week');

app.use('/', authRouter);
app.use('/', foodsRouter);
app.use('/', weekRouter);

const databaseConnection = require('./utils/connect-local-mongodb');
databaseConnection.makeLocalDBConnection();
databaseConnection.checkDBConnectionStatus();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

module.exports = { app };