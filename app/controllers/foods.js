const Foods = require('../models/Foods');
const User = require('../models/User');

const defaultFoods = require('../../data/seed.json');

exports.foods_create_post = async (req, res) => {

    const user = req.body.user

    let userAlreadyHasCollection = Boolean(await Foods.exists({ user }));
    if (userAlreadyHasCollection) {
        return res.status(400).json({ "message": `User ${user} already has associated Foods document.` });
    };

    const newFoodsDocument = new Foods;
    newFoodsDocument.user = user;
    assignFoodsDocumentToUser(newFoodsDocument, user);
    populateWithDefaults(newFoodsDocument, defaultFoods);

    try {
        newFoodsDocument.save();
        res.status(201).json({ "message": "New Foods document for user created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ "message": "Error creating new Foods document - please try again later." });
    };

};

const populateWithDefaults = (foodsDocument, defaultData) => {
    Object.keys(defaultData).map(category => {
        foodsDocument[category] = defaultData[category];
    })
};

const assignFoodsDocumentToUser = (document, user) => {
    User.findById(user)
        .then(User => {
            User.foods = document._id;
            User.save();
        })
        .catch(error => {
            console.error(error);
        })
}

exports.foods_read_get = (req, res) => {
    const { user, optionalCategoryFilter } = { ...req.query };
    Foods.findOne({ user })
        .then(Foods => {

            if (optionalCategoryFilter) {
                const Category = Foods[optionalCategoryFilter];
                return res.status(200).json({ Category });
            };

            if (Foods == null) {
                return res.status(404).json({ "message": `Food data for user ${user} not found, please try again later.` });
            };

            res.status(200).json({ Foods });

        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ "message": `Error getting Foods for user ${user}, please try again later.` });
        });
};

exports.foods_update_post = (req, res) => {
    const { user, category, action, item, itemToEdit } = { ...req.body };
    Foods.findOne({ user })
        .then(Foods => {

            switch (action) {
                case "add":
                    Foods[category].push(item);
                    break;
                case "remove":
                    Foods[category] = Foods[category].filter(element => element != item);
                    break;
                case "edit":
                    Foods[category][Foods[category].indexOf(itemToEdit)] = item;
                    break;
                default:
                    res.status(400).json({ "message": `Error updating document, action parameter (${action}) provided not valid!` });
                    return;
            };

            Foods.save();
            res.status(200).json({ "message": `Successfully completed ${action} action!` });

        })
        .catch(error => {

            console.error(error);
            res.status(400).json({ "message": "Error removing food item, please try again later." });

        });
};

exports.foods_delete_post = (req, res) => {
    Foods.findOneAndDelete({ user: req.body.user })
        .then(() => {
            res.status(200).json({ "message": `Food records for user ${req.body.user} successfully deleted!` });
        })
        .catch(error => {
            res.status(400).json({ "message": `Error deleting food records for user ${req.body.user}, please try again later.` });
            console.error(error);
        });
};