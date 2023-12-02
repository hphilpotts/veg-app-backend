const Week = require('../models/Week');
const dateServices = require('../services/dates');

exports.week_create_post = async (req, res) => {
    const { user, date } = { ...req.body};
    const weekCommencing = dateServices.getWeekCommencing(date);

    try {

        existingWeek = await Week.findOne({ user, weekCommencing });

        if (existingWeek) {
            console.error('An entry for the current week already exists!');
            return res.status(403).json({ "message": "Unable to create new Week document! An entry for the week selected already exists." });
        };

        const newWeek = new Week({
            user,
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

exports.week_index_get = (req, res) => {
    const user = req.query.user;
    Week.find({ user }).sort('-weekCommencing')
        .then(Weeks => {
            res.status(200).json({ Weeks });
        })
        .catch(error => {
            console.console.error((error));
            res.status(400).json({ "message": "Error getting Weeks index, please try again later." })
        });
};

exports.week_byDate_get = (req, res) => {
    const { user, date } = { ...req.query };
    const weekCommencing = dateServices.getWeekCommencing(date);
    Week.findOne({ user, weekCommencing })
        .then(Week => {
            res.status(200).json({ Week });
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ "message": "Error getting week by date, please try again later" })
        });
};

// exports.week_currentDay_put = (req, res) => {
//     const { userOwner } = req.body;
//     const currentDay = handleCurrent.getCurrentDayOfTheWeek();

//     Week.findOne({ userOwner, weekCommencing })
//         .then(Week => {
//             const entriesFromToday = Week[`${currentDay}`];
//             res.json({ entriesFromToday }).status(200);
//         })
//         .catch(err => {
//             console.error(err);
//             res.json({ "message": "Error getting today's entries, please try again later." }).status(400);
//         });
// }

// exports.week_detailById_put = (req, res) => {
//     const { id, userOwner } = req.body;
//     Week.findOne({ id, userOwner })
//         .then(Week => {
//             res.json({ Week }).status(200);
//         })
//         .catch(err => {
//             console.error(err);
//             res.json({ "message": "Error getting week by id, please try again later." }).status(400);
//         });
// }

// exports.week_dailyDetailById_put = (req, res) => {
//     const { id, day, userOwner } = req.body;
//     Week.findOne({ id, userOwner })
//         .then(Week => {
//             const dayDetail = Week[day];
//             res.json({ dayDetail }).status(200);
//         })
//         .catch(err => {
//             console.error(err);
//             res.json({ "message": "Error getting day by id, please try again later." }).status(400);
//         });
// }

// exports.week_updateEntries_post = async (req, res) => {
//     const { id, dayOfWeek, foodItem, userOwner } = req.body;
//     try {
//         Week.findOne({ id, userOwner })
//             .then(Week => {
//                 Week[dayOfWeek].addToSet(foodItem);
//                 Week.save();
//                 res.json({ "message": "New item added successfully! Selected week updated." }).status(201);
//             })
//             .catch(err => {
//                 console.error(err);
//                 res.json({ "message": "Unable to add item and update week - please try again later." }).status(400);
//             })

//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Server error');
//     }
// }

// exports.week_deleteAll = async (req, res) => {
//     const { id, userOwner } = req.body;
//     try {
//         await Week.findOne({ id, userOwner }).deleteOne();
//         res.json({ "message": "Week successfully deleted." }).status(200);
//     } catch (err) {
//         console.error(err);
//         res.json({ "message": "Error deleting week." }).status(400);
//     }
// }

// exports.week_deleteDay = async (req, res) => {
//     const { id, dayOfWeek, userOwner } = req.body;
//     try {
//         Week.findOne({ id, userOwner })
//             .then(Week => {
//                 Week[dayOfWeek] = [];
//                 Week.save();
//                 res.json({ "message": "Day successfully deleted from week." }).status(200);
//             })
//             .catch(err => {
//                 console.error(err);
//                 res.json({ "message": "Error deleting day from week." }).status(400);
//             })
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Server error');
//     }
// }

// exports.week_deleteEntry = (req, res) => {
//     const { id, dayOfWeek, foodItem, userOwner } = req.body;
//     try {
//         Week.findOne({ id, userOwner })
//             .then(Week => {
//                 Week[dayOfWeek].pull(foodItem);
//                 Week.save();
//                 res.json({ "message": "Food item successfully deleted from day's entries." }).status(200);
//             })
//             .catch(err => {
//                 console.error(err);
//                 res.json({ "message": "Error deleting food item from day's entries." }).status(400);
//             })
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Server error');
//     }
// }