const express = require('express');
const router = express.Router();

router.use(express.json());

const weekController = require('../controllers/week');

const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/week/create', authorisationCheck, weekController.week_create_post); // req.body: user, date
router.get('/week/index', isLoggedInCheck, weekController.week_index_get); // req.query: user
router.get('/week/find', isLoggedInCheck, weekController.week_byDate_get); // req.query: user, date
router.put('/week/update', authorisationCheck, weekController.week_update_post); // req.body: id, day, newData
router.delete('/week/delete', authorisationCheck, weekController.week_delete); // req.body: id

module.exports = router;