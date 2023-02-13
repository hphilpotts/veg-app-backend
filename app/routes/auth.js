// * auth routes

const router = require('express').Router();
const authCntrl = require('../controllers/auth')

router.post('/auth/signup', authCntrl.auth_signup);
router.post('/auth/signin', authCntrl.auth_signin);

module.exports = router;