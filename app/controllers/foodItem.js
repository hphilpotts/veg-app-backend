const FoodItem = require('../models/FoodItem');

exports.foodItem_create_post = async (req, res) => {
    const newFoodItem = new FoodItem(req.body);
    newFoodItem.save()
        .then(() => {
            res.status(201).json({ "message": "New food added successfully!" });
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({ "message": "Unable to add item - please try again later." });
        });
};

exports.foodItem_index_get = (req, res) => {
    FoodItem.find()
        .then(foodItems => {
            res.json({ foodItems }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error getting food items, please try again later." }).status(400);
        })
}

exports.foodItem_category_get = (req, res) => {
    const category = req.params.category;
    FoodItem.find({ category })
        .then(foodItems => {
            res.status(200).json({ foodItems });
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err);
        })
}

exports.foodItem_favourites_get = (req, res) => {
    const user = req.params.user;
    console.log(user);
    FoodItem.find({ favouritedBy: user })
        .then(foodItems => {
            console.log(foodItems);
            res.json({ foodItems }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error finding a user's favourite foods, please try again later" }).status(400);
        })
}

exports.foodItem_detail_put = (req, res) => {
    FoodItem.findById(req.body.id)
        .then(foundItem => {
            res.json({ foundItem }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error finding food by name, please try again later." }).status(400);
        })
}

exports.foodItem_byUser_put = (req, res) => {
    FoodItem.find({ userOwner: req.body.userOwner })
        .then(usersItems => {
            res.json({ usersItems }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error finding food added by a specific user, please try again later" }).status(400);
        })
}

// U

exports.foodItem_edit_post = (req, res) => {
    const id = req.body.id;
    const userOwner = req.body.userOwner;
    FoodItem.findOneAndUpdate({ id, userOwner }, req.body, {
        new: true
    })
        .then(() => {
            res.json({ "message": "Food item updated successfully!" }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error updating food item, please try again later." }).status(400);
        })
}

exports.foodItem_updateFavourites_post = async (req, res) => {

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
    const { id, userOwner } = req.body;
    try {
        await FoodItem.findOne(id, userOwner).deleteOne();
        res.json({ "message": "Food item successfully deleted." }).status(200);
    } catch (err) {
        console.error(err);
        res.json({ "message": "Error deleting item." }).status(400);
    }
}