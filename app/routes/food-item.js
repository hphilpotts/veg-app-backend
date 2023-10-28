const express = require('express');
const router = express.Router();


router.use(express.json());

const foodItemController = require('../controllers/food-item');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foodItem/add', isLoggedInCheck, foodItemController.foodItem_create_post);

router.get('/foodItem/index', foodItemController.foodItem_index_get);

router.put('/foodItem/detail', isLoggedInCheck, foodItemController.foodItem_detail_put);
router.put('/foodItem/userAddedBy', isLoggedInCheck, foodItemController.foodItem_byUser_put);
router.put('/foodItem/favourites', isLoggedInCheck, foodItemController.foodItem_favourites_put);

router.post('/foodItem/edit', authorisationCheck, foodItemController.foodItem_edit_post);
router.post('/foodItem/favourite', authorisationCheck, foodItemController.foodItem_updateFavourites_post);

router.delete('/foodItem/delete', authorisationCheck, foodItemController.foodItem_deleteById);

module.exports = router;