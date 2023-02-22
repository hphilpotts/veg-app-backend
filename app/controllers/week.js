const Week = require('../models/TestWeek'); // ! TESTING ONLY - revert to '../models/Week'
const handleCurrent = require('../services/handle-current-day')

// TODO : revert once testing completed

    // ! commented out for testing only:
    // const weekCommencing = handleCurrent.getFirstDayOfCurrentWeek();
    const currentDay = handleCurrent.getCurrentDayOfTheWeek();
    // ! TESTING ONLY - sets to current time instead of midnight Sunday of current week:
    const weekCommencing = new Date(); 


// CREATE
exports.week_create_post = async (req, res) => {
    const { userOwner } = req.body;

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
exports.week_indexByUser_get = async (req, res) => {
    const { userOwner } = req.body;
    Week.find({ userOwner }).sort('-weekCommencing')
    .then(Weeks => {
        res.json({ Weeks }).status(200);
    })
    .catch(err => {
        console.error(err);
        res.json({ "message": "Error getting all weeks, please try again later." }).status(400);
    });
}

exports.week_currentWeek_get = (req, res) => {
    const { userOwner, weekCommencing } = req.body;
    Week.findOne({ userOwner, weekCommencing })
    .then( Week => {
        res.json({ Week }).status(200);
    })
    .catch(err => {
        console.error(err);
        res.json({ "message": "Error getting current week, please try again later."}).status(400);
    });
}

exports.week_currentDay_get = (req, res) => {
    const { userOwner, weekCommencing } = req.body;
    Week.findOne({ userOwner, weekCommencing })
    .then( Week => {
        const entriesFromToday = Week[`${currentDay}`];
        res.json({ entriesFromToday }).status(200);
    })
    .catch(err => {
        console.error(err);
        res.json({ "message": "Error getting today's entries, please try again later."}).status(400);
    });
}

exports.week_detailById_get = (req, res) => {
    const { id } = req.body;
    Week.findById(id)
    .then( Week => {
        res.json({ Week }).status(200);
    })
    .catch(err => {
        console.error(err);
        res.json({ "message": "Error getting week by id, please try again later."}).status(400);
    });
}

exports.week_dailyDetailById_get = (req, res) => {
    const { id, day } = req.body;
    Week.findById(id)
    .then( Week => {
        const dayDetail = Week[day];
        res.json({ dayDetail }).status(200);
    })
    .catch(err => {
        console.error(err);
        res.json({ "message": "Error getting day by id, please try again later."}).status(400);
    });
}

// UPDATE
exports.week_updateEntries_post = async (req, res) => {
    const { id, dayOfWeek, foodItem } = req.body;
    try {
        Week.findById(id)
        .then( Week => {
            Week[dayOfWeek].addToSet(foodItem);
            Week.save()
            res.json({ "message": "New item added successfully! Selected week updated." }).status(201);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Unable to add item and update week - please try again later." }).status(400);
        })

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

// DELETE

exports.week_deleteAll = (req, res) => {

}

exports.week_deleteDay = (req, res) => {

}

exports.week_deleteEntry = (req, res) => {

}