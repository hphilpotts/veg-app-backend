const FoodItem = require('../models/Food-item');

exports.foodItem_create_post = async (req, res) => {
    const { foodItemName, foodItemCategory, userAddedBy } = req.body;

    try {

        if (foodItemName === undefined || foodItemCategory === undefined) {
            return res.json({ "message": "Unable to add item - name or category missing" }).status(400);
        }

        existingFoodItem = await FoodItem.findOne({ foodItemName });
        if (existingFoodItem) {
            return res.json({ "message": "Unable to add item - this item already exists!" }).status(403);
        }

        const newFoodItem = new FoodItem({
            foodItemName,
            foodItemCategory,
            userAddedBy
        });

        await newFoodItem.save()
            .then(() => {
                res.json({ "message": "New food added successfully!" }).status(201);
            }).catch((err) => {
                console.error(err);
                res.json({ "message": "Unable to add item - please try again later." }).status(400);
            })

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }


}

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

exports.foodItem_detail_get = (req, res) => {
    FoodItem.findById(req.body.id)
        .then(foundItem => {
            res.json({ foundItem }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error finding food by name, please try again later." }).status(400);
        })
}

exports.foodItem_byUser_get = (req, res) => {
    FoodItem.find({ userAddedBy: req.body.userAddedBy })
        .then(usersItems => {
            res.json({ usersItems }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error finding food added by a specific user, please try again later" }).status(400);
        })
}

exports.foodItem_favourites_get = (req, res) => {
    FoodItem.find({ usersFavouritedBy: req.body.usersFavouritedBy })
        .then(usersFavourites => {
            res.json({ usersFavourites }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error finding a user's favourite foods, please try again later" }).status(400);
        })
}

// U

exports.foodItem_edit_post = (req, res) => {
    FoodItem.findByIdAndUpdate(req.body.id, req.body)
        .then(() => {
            res.json({ "message": "Food item updated successfully!" }).status(200);
        })
        .catch(err => {
            console.error(err);
            res.json({ "message": "Error updating food item, please try again later." }).status(400);
        })
}

exports.foodItem_updateFavourites_post = async (req, res) => {

    const { id, user } = req.body;

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
    try {
        await FoodItem.findByIdAndDelete(req.body.id);
        res.json({ "message": "Food item successfully deleted." }).status(200);
    } catch (err) {
        console.error(err);
        res.json({ "message": "Error deleting item." }).status(400);
    }
}