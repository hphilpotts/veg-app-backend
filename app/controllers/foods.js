const Foods = require('../models/Foods');

const defaultFoods = require('../../data/seed.json');

exports.foods_create_post = async (req, res) => {

    let userHasCollection = Boolean(await Foods.exists({ user: req.body.user }));

    if (userHasCollection) {
        res.status(400).json({ "message": "User already has associated Foods document." });
        return;
    };

    const intialFoods = new Foods;
    intialFoods.user = req.body.user;
    populateFoodsDefaults(intialFoods);

    try {
        intialFoods.save();
        res.status(201).json({ "message": "New Foods document created successfully!" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ "message": "Error creating new Foods document - please try again later." });
    };

};

const populateFoodsDefaults = foodsDocument => {
    Object.keys(defaultFoods).map(category => foodsDocument[category] = defaultFoods[category]);
};

exports.foods_document_get = (req, res) => {
    const { user, category } = { ...req.query };
    Foods.findOne({ user })
        .then(Foods => {
            if (category) Foods = Foods[category];
            res.status(200).json({ Foods });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error getting user's Foods, please try again later." });
        });
};

exports.foods_updateItem_post = (req, res) => {
    const { user, category, action, item, itemToUpdate } = { ...req.query };
    Foods.findOne({ user })
        .then(Foods => {
            switch(action) {
                case "add": 
                    Foods[category].push(item);
                    break;
                case "remove":
                    Foods[category] = Foods[category].filter(element => element != item);
                    break;
                case "update":
                    Foods[category][Foods[category].indexOf(itemToUpdate)] = item;
                    break;
                default:
                    res.status(400).json({ "message": "Error updating document, action parameter provided not valid!" });
                    return;
            };
            Foods.save();
            res.status(200).json({ "message": `Successfully completed ${action} action!` });

        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error removing food item, please try again later." });
        });
};

// exports.foodItem_deleteById = async (req, res) => {
//     FoodItem.findByIdAndDelete(req.query.id)
//         .then(() => {
//             res.status(200).json({ "message": "Food item successfully deleted." });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ "message": "Error deleting item." });
//         });
// };