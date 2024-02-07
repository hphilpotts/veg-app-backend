const User = require('../models/User');

exports.user_favourites_get = (req, res) => {
    const id = req.query.userId;
    User.findById(id)
        .then(User => {
            const userFavourites = User.favourites;
            res.status(200).json({ userFavourites });
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ "message": "Error retrieving User favourites" });
        });
};

exports.user_favourites_update_put = (req, res) => {
    const { id, foodItem } = { ...req.body };
    User.findById(id)
        .then(User => {
            const favourites = User.favourites;

            if (favourites.includes(foodItem)) {
                User.favourites = favourites.filter(item => item != foodItem);
            } else {
                User.favourites.push(foodItem)
            }

            User.save();
            res.status(200).json({ "message": "Updated favourites successfully!" });

        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ "message": "Error updating User favourites..." });
        });
};