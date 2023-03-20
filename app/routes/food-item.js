const express = require('express');
const router = express.Router();


router.use(express.json());

const foodItemController = require('../controllers/food-item');
// ? should the below import be for authorisation instead...?
const authentication = require('../middleware/authentication');
const isLoggedInCheck = require('../middleware/authentication');

router.post('/foodItem/add', isLoggedInCheck, foodItemController.foodItem_create_post);

router.get('/foodItem/index', isLoggedInCheck, foodItemController.foodItem_index_get);

router.put('/foodItem/detail', isLoggedInCheck, foodItemController.foodItem_detail_put);
router.put('/foodItem/userAddedBy', isLoggedInCheck, foodItemController.foodItem_byUser_put);
router.put('/foodItem/favourites', isLoggedInCheck, foodItemController.foodItem_favourites_put);

router.post('/foodItem/edit', authentication, foodItemController.foodItem_edit_post);
router.post('/foodItem/favourite', authentication, foodItemController.foodItem_updateFavourites_post);

router.delete('/foodItem/delete', authentication, foodItemController.foodItem_deleteById);

module.exports = router;