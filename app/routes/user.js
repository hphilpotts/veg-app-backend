const express = require('express');
const router = express.Router();

router.use(express.json());

const userController = require('../controllers/user');

// todo - add auth protection to routes once tested
router.get('/user/favourites', userController.user_favourites_get); // req.query: userId = user._id

module.exports = router;