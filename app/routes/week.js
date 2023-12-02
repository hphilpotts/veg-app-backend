const express = require('express');
const router = express.Router();

router.use(express.json());

const weekController = require('../controllers/week');

const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/week/create', weekController.week_create_post);
router.get('/week/index', weekController.week_index_get);
router.get('/week/find', weekController.week_byDate_get);
router.put('/week/update', weekController.week_update_post);
router.delete('/week/delete', weekController.week_delete);

module.exports = router;