// ! TESTING PURPOSES
// TODO : remove

const mongoose = require('mongoose');

const TestWeekSchema = mongoose.Schema({

    userOwner: { type: mongoose.Types.ObjectId, ref: 'User' },

    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],

    weekCommencing: Date
    
},
    {
        timestamps: true,
    });

const TestWeek = mongoose.model("TestWeek", TestWeekSchema);

module.exports = TestWeek;