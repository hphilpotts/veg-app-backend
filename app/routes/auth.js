// * auth routes

const express = require('express');
const router =express.Router();

router.use(express.json())

const authCntrl = require('../controllers/auth')

router.post('/auth/signup', authCntrl.auth_signup);
router.post('/auth/signin', authCntrl.auth_signin);

module.exports = router;