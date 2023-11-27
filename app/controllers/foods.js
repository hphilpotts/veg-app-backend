const Foods = require('../models/Foods');

const defaultFoods = require('../../data/seed.json');

exports.foods_create_post = async (req, res) => {
    const intialFoods = new Foods;
    intialFoods.user = req.body.user;
    populateFoodsDefaults(intialFoods);
    try {
        intialFoods.save();
        res.status(201).json({ "message": "New food added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ "message": "Unable to add item - please try again later." });
    };
};

const populateFoodsDefaults = foodsDocument => {
    Object.keys(defaultFoods).map(category => foodsDocument[category] = defaultFoods[category]);
};

exports.foods_document_get = (req, res) => {
    const { user, category } = { ...req.query }
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

// exports.foodItem_edit_post = (req, res) => {
//     FoodItem.findById(req.query.id)
//         .then(foodItemEditing => {
//             for (const key in req.body) foodItemEditing[key] = req.body[key];
//             foodItemEditing.save();
//             res.status(200).json({ "message": "Food item updated successfully!" });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ "message": "Error updating food item, please try again later." });
//         });
// };

// exports.foodItem_updateFavourites_post = (req, res) => {
//     // TODO revise and restructure
//     FoodItem.findById(req.query.id)
//         .then(foodItem => {
//             foodItem.favourited = !foodItem.favourited;
//             foodItem.save();
//             res.status(200).json({ "message": "Food item favourite status updated successfully!" });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ "message": "Error updating food item favourite status" });
//         });
// };

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