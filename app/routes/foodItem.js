const express = require('express');
const router = express.Router();


router.use(express.json());

const foodsController = require('../controllers/foods');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foods/create', foodsController.foods_create_post);
router.get('/foods', foodsController.foods_document_get);
router.post('/foods/add', foodsController.foods_addItem_post);
router.post('/foods/remove', foodsController.foods_removeItem_post);

// router.post('/foodItem/favourite/:id', authorisationCheck, foodsController.foodItem_updateFavourites_post);

// router.delete('/foodItem/delete/:id', authorisationCheck, foodsController.foodItem_deleteById);

module.exports = router;