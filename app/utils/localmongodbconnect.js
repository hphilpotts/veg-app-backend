// Local MongoDB connection separated out into its own file in order to absract details 
const mongoose = require('mongoose');   
require('dotenv').config();

const makeLocalMongoDBConnection = () => {
    mongoose.set('strictQuery', true); // this and second param in .connect() below prevent deprecation warnings
    const mongoDBLocalURL = process.env.MONGODB_LOCAL_URL;
    mongoose.connect(
        mongoDBLocalURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {
            console.log('Connected to local MongoDB! Database:', mongoose.connection.name, 'on PORT', mongoose.connection.port); // -> check db connection is working
        }
    )
}

module.exports = makeLocalMongoDBConnection;