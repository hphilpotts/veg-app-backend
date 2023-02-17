const FoodItem = require('../models/Food-item');

exports.foodItem_create_post = async (req, res) => {
    const { foodItemName, foodItemCategory, userAddedBy } = req.body

    try {

        if (foodItemName === undefined || foodItemCategory === undefined) {
            return res.json({ "message": "Unable to add item - name or category missing" }).status(400)
        }

        existingFoodItem = await FoodItem.findOne({ foodItemName });
        if (existingFoodItem) {
            return res.json({ "message": "Unable to add item - this item already exists!" }).status(403)
        }

        const newFoodItem = new FoodItem({
            foodItemName,
            foodItemCategory,
            userAddedBy
        });

        await newFoodItem.save()
            .then(() => {
                res.json({ "message": "New food added successfully!" }).status(201)
            }).catch((err) => {
                console.error(err);
                res.json({ "message": "Unable to add item - please try again later." }).status(400)
            })

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error')
    }


}

// R
exports.foodItem_index_get = (req, res) => {
    FoodItem.find()
    .then(foodItems => {
        res.json({ foodItems })
    })
    .catch(err => {
        console.error(err);
        res.json({"message": "Error getting food items, please try again later"}).status(400)
    })
}

// U

// D