// Local MongoDB connection separated out into its own file in order to absract details 
const mongoose = require('mongoose');
require('dotenv').config();

const makeLocalDBConnection = () => {
    mongoose.set('strictQuery', true); // this and second param in .connect() below prevent deprecation warnings
    const mongoDBLocalURL = process.env.MONGODB_LOCAL_URL;
    mongoose.connect(
        mongoDBLocalURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {
            if (mongoose.connection.name === undefined) {
                console.error('Mongoose connection with MongoDB not established!');
            } else {
                console.log('Connected to local MongoDB! Database:', mongoose.connection.name, 'on PORT', mongoose.connection.port);
            }
        }
    )
}

const checkDBConnectionStatus = () => {
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open!');
    })
    mongoose.connection.on('error', function (err) {
        console.error('Mongoose default connection error:', err);
    })
    mongoose.connection.on('disconnected', function () {
        console.warn('\nMongoose default connection disconnected!');
    })
}

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = { makeLocalDBConnection, checkDBConnectionStatus };