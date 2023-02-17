// * server.js - import the app and assign HTTP server, connect to db, entry point of app

const { app } = require("./app");

const PORT = process.env.PORT;
app.listen(PORT, () => {
    try {
        console.log(`Hello-Express Application is running on port ${PORT}`)
    } catch (error) {
        console.error(error);
    }
});