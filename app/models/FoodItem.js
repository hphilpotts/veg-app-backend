const mongoose = require('mongoose');

const foodItemCategories = ['green vegetables', 'salad vegetables', 'salad leaves', 'root vegetables', 'onions & friends', 'berries', 'orchard fruits', 'citrus fruits', 'exotic fruits', 'grains', 'nuts & seeds', 'miscellaneous'];

const foodItemSchema = mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: foodItemCategories,
        required: true
    },
    favouritedBy: [{
        type: mongoose.Types.ObjectId, ref: 'User'
    }]

})

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;