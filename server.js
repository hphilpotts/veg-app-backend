// * server.js - import the app and assign HTTP server, connect to db, entry point of app

const { app } = require("./app");

// Configue PORT:
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Hello-Express Application is running on port ${PORT}`)); // -> check app is running)

// ? Previously DB connection was here, I later moved this to index.js. I've not yet found a clear answer...perhaps either is ok? 
// ? I've also seen suggestions of putting the db connection in its own file...?