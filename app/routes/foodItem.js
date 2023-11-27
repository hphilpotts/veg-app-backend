const express = require('express');
const router = express.Router();


router.use(express.json());

const foodsController = require('../controllers/foods');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foods/create', foodsController.foods_create_post);

router.get('/foods/all/', foodsController.foods_byUser_get);
// router.get('/foodItem/category/:category', foodsController.foodItem_categoryIndex_get);
// router.get('/foodItem/favourites', foodsController.foodItem_favourites_get);
// router.get('/foodItem/userAdded', foodsController.foodItem_userAdded_get);
// router.get('/foodItem/detail/:id', foodsController.foodItem_detail_get);

// router.post('/foodItem/edit/:id', authorisationCheck, foodsController.foodItem_edit_post);
// router.post('/foodItem/favourite/:id', authorisationCheck, foodsController.foodItem_updateFavourites_post);

// router.delete('/foodItem/delete/:id', authorisationCheck, foodsController.foodItem_deleteById);

module.exports = router;