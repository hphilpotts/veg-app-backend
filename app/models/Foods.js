const mongoose = require('mongoose');

const FoodsSchema = mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    greenVegetables: [String],
    saladVegetables: [String],
    saladLeaves: [String],
    rootVegetables: [String],
    onionsAndFriends: [String],
    legumesAndPulses: [String],
    nutsAndSeeds: [String],
    grainsAndCereals: [String],
    orchardFruits: [String],
    citrusFruits: [String],
    exoticFruits: [String],
    berries: [String],
    otherFruits: [String],
    herbs: [String],
    spices: [String],
    sweeteners: [String],
    oils: [String],
    miscellaneous: [String],
});

const Foods = mongoose.model("Foods", FoodsSchema);

module.exports = Foods;