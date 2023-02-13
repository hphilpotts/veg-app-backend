// * auth routes

const router = require('express').Router();

const authCntrl = require('../controllers/auth')

router.get('/auth/signup', authCntrl.auth_signup_get);

module.exports = router;