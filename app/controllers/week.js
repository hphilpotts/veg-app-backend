const Week = require('../models/Week');
const handleCurrent = require('../services/handle-current-day');

const currentDay = handleCurrent.getCurrentDay();
const weekCommencingFrom = handleCurrent.getWeekCommencing();

exports.week_create_post = async (req, res) => {
    const { user, inputDate } = req.body;
    const weekCommencing = weekCommencingFrom(inputDate);

    try {

        existingWeek = await Week.findOne({ user, weekCommencing });

        if (existingWeek) {
            console.error('An entry for the current week already exists!');
            return res.status(403).json({ "message": "Unable to create new Week document! An entry for the week selected already exists." });
        };

        const newWeek = new Week({
            userOwner,
            weekCommencing
        });

        await newWeek.save()
            .then(() => {
                res.status(201).json({ "message": "New Week added successfully!" });
            }).catch((error) => {
                console.error(error);
                res.status(400).json({ "message": "Unable to create Week document - please try again later." });
            });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    };

};

exports.week_indexByUser_put = async (req, res) => {
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

exports.week_currentWeek_put = async (req, res) => {
    const { userOwner } = req.body;
    await Week.findOne({ userOwner, weekCommencing })
        .then(Week => {
            res.json({ Week }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error getting current week, please try again later." }).status(400);
        });
}

exports.week_currentDay_put = (req, res) => {
    const { userOwner } = req.body;
    const currentDay = handleCurrent.getCurrentDayOfTheWeek();

    Week.findOne({ userOwner, weekCommencing })
        .then(Week => {
            const entriesFromToday = Week[`${currentDay}`];
            res.json({ entriesFromToday }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error getting today's entries, please try again later." }).status(400);
        });
}

exports.week_detailById_put = (req, res) => {
    const { id, userOwner } = req.body;
    Week.findOne({ id, userOwner })
        .then(Week => {
            res.json({ Week }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error getting week by id, please try again later." }).status(400);
        });
}

exports.week_dailyDetailById_put = (req, res) => {
    const { id, day, userOwner } = req.body;
    Week.findOne({ id, userOwner })
        .then(Week => {
            const dayDetail = Week[day];
            res.json({ dayDetail }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error getting day by id, please try again later." }).status(400);
        });
}

exports.week_updateEntries_post = async (req, res) => {
    const { id, dayOfWeek, foodItem, userOwner } = req.body;
    try {
        Week.findOne({ id, userOwner })
            .then(Week => {
                Week[dayOfWeek].addToSet(foodItem);
                Week.save();
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

exports.week_deleteAll = async (req, res) => {
    const { id, userOwner } = req.body;
    try {
        await Week.findOne({ id, userOwner }).deleteOne();
        res.json({ "message": "Week successfully deleted." }).status(200);
    } catch (err) {
        console.error(err);
        res.json({ "message": "Error deleting week." }).status(400);
    }
}

exports.week_deleteDay = async (req, res) => {
    const { id, dayOfWeek, userOwner } = req.body;
    try {
        Week.findOne({ id, userOwner })
            .then(Week => {
                Week[dayOfWeek] = [];
                Week.save();
                res.json({ "message": "Day successfully deleted from week." }).status(200);
            })
            .catch(err => {
                console.error(err);
                res.json({ "message": "Error deleting day from week." }).status(400);
            })
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

exports.week_deleteEntry = (req, res) => {
    const { id, dayOfWeek, foodItem, userOwner } = req.body;
    try {
        Week.findOne({ id, userOwner })
            .then(Week => {
                Week[dayOfWeek].pull(foodItem);
                Week.save();
                res.json({ "message": "Food item successfully deleted from day's entries." }).status(200);
            })
            .catch(err => {
                console.error(err);
                res.json({ "message": "Error deleting food item from day's entries." }).status(400);
            })
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}