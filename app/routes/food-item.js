const express = require('express');
const router = express.Router();


router.use(express.json());

const foodItemController = require('../controllers/food-item');

router.post('/foodItem/add', foodItemController.foodItem_create_post);
router.get('/foodItem/index', foodItemController.foodItem_index_get);

module.exports = router;