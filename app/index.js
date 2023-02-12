// Require statements:
const express = require("express");
require('dotenv').config();

// Invoke the express app module functionality
const app = express();

// -- manual testing (also a refresher of url/query params!)
// Root route test:
app.get('/', (req, res) => {
    res.json({ "response": "Hello, World." })
    res.status(200);
})
// Test URL parameters:
app.get("/express/:name", function (req, res) {
    console.log(req.route);
    res.json({ "res": `${req.params.name} is loving express` });
});
// Test Query parameters:
app.get("/hello/:message", function (req, res) {
    res.json(`Hello, ${req.params.message}. My name is ${req.query.firstName} ${req.query.lastName}`);
});

module.exports = { app }