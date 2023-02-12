// * server.js - import the app and assign HTTP server, connect to db, entry point of app


const { app } = require("./app");
const mongoose = require("mongoose");

// Configue PORT:
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Hello-Express Application is running on port ${PORT}`)); // -> check app is running)

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