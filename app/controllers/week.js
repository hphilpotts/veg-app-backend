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

exports.week_update_post = (req, res) => {
    const { id, day, newData } = { ...req.body };
    console.log(id)
    Week.findById(id)
        .then(Week => {
            Week[day] = newData;
            Week.save();
            res.status(200).json({ "message": "Successfully updated Week document!" });
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ "message": "Error updating Week document, please try again later" });
        });
};