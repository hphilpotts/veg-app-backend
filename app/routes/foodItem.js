const express = require('express');
const router = express.Router();


router.use(express.json());

const foodsController = require('../controllers/foods');
const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/foods/create', foodsController.foods_create_post); // request body: user
router.get('/foods', foodsController.foods_read_get); // query params: user, categoryOption
router.post('/foods/update', foodsController.foods_update_post); // request body: user, category, action, item, itemToUpdate
router.delete('/foods/delete', foodsController.foods_delete_post); // request body: user

module.exports = router;