const express = require('express');
const router = express.Router();


router.use(express.json());

const foodsController = require('../controllers/foods');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foods/create', authorisationCheck, foodsController.foods_create_post); // request body: user
router.get('/foods', isLoggedInCheck, foodsController.foods_read_get); // query params: user, optionalCategoryFilter
router.post('/foods/update', authorisationCheck, foodsController.foods_update_post); // request body: user, category, action, item, itemToEdit
router.delete('/foods/delete', authorisationCheck, foodsController.foods_delete_post); // request body: user

module.exports = router;