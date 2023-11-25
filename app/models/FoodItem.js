const mongoose = require('mongoose');

const foodItemCategories = [
    "Green Vegetables",
    "Salad Vegetables",
    "Salad Leaves",
    "Root Vegetables",
    "Onions & Friends",
    "Legumes & Pulses",
    "Nuts & Seeds",
    "Grains & Cereals",
    "Orchard Fruits",
    "Citrus Fruits",
    "Exotic Fruits",
    "Berries",
    "Other Fruits",
    "Herbs",
    "Spices",
    "Sweeteners",
    "Oils",
    "Miscellaneous"
];

const foodItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: foodItemCategories,
        required: true
    },
    addedByUser: {
        type: Boolean,
        default: true
    },
    favourited: {
        type: Boolean,
        default: false
    }
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;