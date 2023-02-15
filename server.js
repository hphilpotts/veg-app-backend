// * server.js - import the app and assign HTTP server, connect to db, entry point of app

const { app } = require("./app");

// Configue PORT - enabled when `npm start` is run, will not run otherwise.
// Aim here is to allow Jest to test correctly - otherwise open handle issue occurs when app.listen is called.
const setPortAndListenEnabled = process.env.PORT_LISTEN;
if (setPortAndListenEnabled) {
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Hello-Express Application is running on port ${PORT}`));
}