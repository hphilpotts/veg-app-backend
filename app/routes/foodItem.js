const express = require('express');
const router = express.Router();


router.use(express.json());

const foodsController = require('../controllers/foods');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foods/create', foodsController.foods_create_post); // query params required: user
router.get('/foods', foodsController.foods_document_get); // query params required: user / optional: category
router.post('/foods/update', foodsController.foods_updateItem_post); // query params required: user, category, action, item  / optional: itemToUpdate

module.exports = router;