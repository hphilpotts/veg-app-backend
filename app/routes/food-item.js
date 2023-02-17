const express = require('express');
const router = express.Router();


router.use(express.json());

const foodItemController = require('../controllers/food-item');

router.post('/foodItem/add', foodItemController.foodItem_create_post);

module.exports = router;