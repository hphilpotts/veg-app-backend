const express = require('express');
const router = express.Router();

router.use(express.json());

const userController = require('../controllers/user');

const authorisationCheck = require('../middleware/authorisation');

router.get('/user/favourites', authorisationCheck, userController.user_favourites_get); // req.query: userId = User._id
router.put('/user/favourites/update', authorisationCheck, userController.user_favourites_update_put) // req.body: id: User._id, foodItem: String

module.exports = router;