// * server.js - import the app and assign HTTP server, connect to db, entry point of app

const { app } = require("./app");

// Configue PORT:
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Hello-Express Application is running on port ${PORT}`)); // -> check app is running)