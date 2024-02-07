const express = require('express');
const router = express.Router();

router.use(express.json());

const userController = require('../controllers/user');

// todo - add auth protection to routes once tested
router.get('/user/favourites', userController.user_favourites_get); // req.query: userId = User._id
router.put('/user/favourites/update', userController.user_favourites_update_put) // req.body: id: User._id, foodItem: String

module.exports = router;