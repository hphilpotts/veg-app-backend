const express = require('express');
const router = express.Router();

router.use(express.json());

const authController = require('../controllers/auth');

router.post('/auth/signup', authController.auth_signup); // req.body: username, email, password
router.post('/auth/signin', authController.auth_signin); // req.body: email, password

module.exports = router;