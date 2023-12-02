const express = require('express');
const router = express.Router();

router.use(express.json());

const weekController = require('../controllers/week');

const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/week/create', weekController.week_create_post);
router.get('/week/index', weekController.week_index_get);
router.get('/week/find', weekController.week_byDate_get);
// router.get('/week/current', weekController.week_currentWeek_put);
// router.put('/week/today', authorisationCheck, weekController.week_currentDay_put);
// router.put('/week/detail', authorisationCheck, weekController.week_detailById_put);
// router.put('/week/dailyDetail', authorisationCheck, weekController.week_dailyDetailById_put);

// router.post('/week/update', authorisationCheck, weekController.week_updateEntries_post);

// router.delete('/week/deleteAll', authorisationCheck, weekController.week_deleteAll);
// router.delete('/week/deleteDay', authorisationCheck, weekController.week_deleteDay);
// router.delete('/week/deleteEntry', authorisationCheck, weekController.week_deleteEntry);

module.exports = router;