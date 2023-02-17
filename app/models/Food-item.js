const mongoose = require('mongoose');

const foodItemCategories = ['green vegetables', 'salad vegetables', 'salad leaves', 'root vegetables', 'onions & friends', 'berries', 'orchard fruits', 'citrus fruits', 'exotic fruits', 'grains', 'nuts & seeds', 'miscellaneous'];

const foodItemSchema = mongoose.Schema({
    userAddedBy: { type: mongoose.Types.ObjectId, ref: 'User'},
    foodItemName: {
        type: String,
        required: true,
        unique: true
    },
    foodItemCategory: {
        type: String,
        enum: foodItemCategories,
        required: true
    },
    usersFavouritedBy: [{
        type: mongoose.Types.ObjectId, ref: 'User'
    }]

})

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;