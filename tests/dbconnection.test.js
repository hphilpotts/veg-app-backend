const mongoose = require('mongoose');
require('dotenv').config();
const connection = require('../app/utils/localmongodbconnect');

beforeAll(async () => {
    await connection();
})

describe("Check database connection:", () => {
    test('mongoose should be connected to the right database', () => { 
        expect(mongoose.connection.client.options.dbName).toBe('veg_app')
        });
    });

afterAll(async () => {
    await mongoose.disconnect();
})