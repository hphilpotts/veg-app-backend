// * auth routes

const express = require('express');
const router = express.Router();

router.use(express.json())

const authController = require('../controllers/auth')

router.post('/auth/signup', authController.auth_signup);
router.post('/auth/signin', authController.auth_signin);

module.exports = router;