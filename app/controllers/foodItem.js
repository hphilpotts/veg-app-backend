const FoodItem = require('../models/FoodItem');

exports.foodItem_create_post = async (req, res) => {
    const newFoodItem = new FoodItem(req.body);
    newFoodItem.save()
        .then(() => {
            res.status(201).json({ "message": "New food added successfully!" });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Unable to add item - please try again later." });
        });
};

exports.foodItem_index_get = (req, res) => {
    FoodItem.find()
        .then(foodItems => {
            res.status(200).json({ foodItems });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error getting all food items, please try again later." });
        });
};

exports.foodItem_categoryIndex_get = (req, res) => {
    const category = req.params.category;
    FoodItem.find({ category })
        .then(foodItems => {
            res.status(200).json({ foodItems });
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err);
        });
};

exports.foodItem_favourites_get = (req, res) => {
    FoodItem.find({ favourited }) // TODO test if this works
        .then(foodItems => {
            res.status(200).json({ foodItems });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error getting all favourited foods, please try again later" });
        });
};

exports.foodItem_userAdded_get = (req, res) => {
    FoodItem.find({ addedByUser })
        .then(foodItems => {
            res.status(200).json({ foodItems });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error getting foods added by the user, please try again later" });
        });
};

exports.foodItem_detail_get = (req, res) => {
    FoodItem.findById(req.query.id)
        .then(foodItem => {
            res.status(200).json({ foodItem });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error getting food details, please try again later." });
        });
};

exports.foodItem_edit_post = (req, res) => {
    FoodItem.findById(req.query.id)
        .then(foodItemEditing => {
            for (const key in req.body) foodItemEditing[key] = req.body[key];
            foodItemEditing.save();
            res.status(200).json({ "message": "Food item updated successfully!" });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error updating food item, please try again later." });
        });
};

exports.foodItem_updateFavourites_post = async (req, res) => {
    // TODO revise and restructure
    const id = req.body.id;
    const user = req.body.userOwner;

    try {
        const foundItem = await FoodItem.findById(id);

        if (foundItem.usersFavouritedBy.includes(user)) {
            try {
                foundItem.usersFavouritedBy.pull(user);
                foundItem.save();
                res.json({ "message": "User has unfavourited this item." }).status(200);
            } catch (err) {
                console.error(err);
                res.json({ "message": "Error removing item from favourites." }).status(400);
            }

        } else {
            try {
                foundItem.usersFavouritedBy.addToSet(user);
                foundItem.save();
                res.json({ "message": "User has favourited this item!" }).status(200);
            } catch (err) {
                console.error(err);
                res.json({ "message": "Error adding item to favourites." }).status(400);
            }
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('server error');
    }

}

exports.foodItem_deleteById = async (req, res) => {
    FoodItem.findByIdAndDelete(req.query.id)
        .then(() => {
            res.status(200).json({ "message": "Food item successfully deleted." });
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({ "message": "Error deleting item." });
        });
};