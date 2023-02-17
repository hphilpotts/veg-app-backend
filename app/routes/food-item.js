const express = require('express');
const router = express.Router();


router.use(express.json());

const foodItemController = require('../controllers/food-item');

router.post('/foodItem/add', foodItemController.foodItem_create_post);
router.get('/foodItem/index', foodItemController.foodItem_index_get);
router.get('/foodItem/detail', foodItemController.foodItem_detail_get);
router.get('/fooItem/userAddedBy', foodItemController.foodItem_byUser_get);
router.get('/foodItem/favourites', foodItemController.foodItem_favourites_get);
router.post('/foodItem/edit', foodItemController.foodItem_edit_post)

module.exports = router;