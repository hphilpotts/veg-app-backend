const mongoose = require('mongoose');

const WeekSchema = mongoose.Schema({

    user: { type: mongoose.Types.ObjectId, ref: 'User' },

    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
    saturday: [String],
    sunday: [String],

    weekCommencing: Date
    
},
{
    timestamps: true,
});

const Week = mongoose.model("Week", WeekSchema);

module.exports = Week;