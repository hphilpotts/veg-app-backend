const express = require('express');
const router = express.Router();


router.use(express.json());

const foodItemController = require('../controllers/foodItem');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foodItem/add', isLoggedInCheck, foodItemController.foodItem_create_post);

router.get('/foodItem/index', foodItemController.foodItem_index_get);
router.get('/foodItem/category/:category', foodItemController.foodItem_categoryIndex_get);
router.get('/foodItem/favourites', foodItemController.foodItem_favourites_get);
router.get('/foodItem/userAdded', foodItemController.foodItem_userAdded_get);
router.get('/foodItem/detail/:id', foodItemController.foodItem_detail_get);

router.post('/foodItem/edit/:id', authorisationCheck, foodItemController.foodItem_edit_post);
router.post('/foodItem/favourite/:id', authorisationCheck, foodItemController.foodItem_updateFavourites_post);

router.delete('/foodItem/delete/:id', authorisationCheck, foodItemController.foodItem_deleteById);

module.exports = router;