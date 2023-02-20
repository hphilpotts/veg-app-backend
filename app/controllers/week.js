const Week = require('../models/Week');
const handleCurrent = require('../services/handle-current-day')

// CREATE
exports.week_create_post = async (req, res) => {
    const { userOwner } = req.body;
    const weekCommencing = handleCurrent.getFirstDayOfCurrentWeek();

    try {

        existingWeek =  await Week.findOne({ userOwner, weekCommencing });
        if (existingWeek) {
            console.warn('An entry for the current week already exists!');
            return res.json({ "message": "An entry for the current week already exists!" }).status(403);
        }

        const newWeek = new Week({
            userOwner,
            weekCommencing
        })

        await newWeek.save()
        .then(() => {
            res.json({ "message": "New week added successfully!" }).status(201);
        }).catch((err) => {
            console.error(err);
            res.json({ "message": "Unable to add week - please try again later." }).status(400);
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }

}

// READ
exports.week_indexByUser_get = (req, res) => {

}

exports.week_currentWeek_get = (req, res) => {

}

exports.week_currentDay_get = (req, res) => {

}

exports.week_detailById_get = (req, ref) => {

}

exports.week_dailyDetailById_get = (req, ref) => {

}

// UPDATE
exports.week_updateEntry_post = (req, res) => {

}

// DELETE

exports.week_deleteAll = (req, res) => {

}

exports.week_deleteDay = (req, res) => {

}

exports.week_deleteEntry = (req, res) => {

}