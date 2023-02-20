const mongoose = require('mongoose');

const WeekSchema = mongoose.Schema({

    userOwner: { type: mongoose.Types.ObjectId, ref: 'User' },

    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],

    weekCommencing: Date
    
},
    {
        timestamps: true,
    });

const Week = mongoose.model("Week", WeekSchema);

module.exports = Week;