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
    // todo - implement when get favs tested
}