const express = require('express');
const router = express.Router();

router.use(express.json());

const weekController = require('../controllers/week');

const isLoggedInCheck = require('../middleware/authentication');
const authorisationCheck = require('../middleware/authorisation');

router.post('/week/newWeek', isLoggedInCheck, weekController.week_create_post);

router.get('/week/index', authorisationCheck, weekController.week_indexByUser_get);
router.get('/week/current', authorisationCheck, weekController.week_currentWeek_get);
router.get('/week/today', authorisationCheck, weekController.week_currentDay_get);
router.get('/week/detail', authorisationCheck, weekController.week_detailById_get);
router.get('/week/dailyDetail', authorisationCheck, weekController.week_dailyDetailById_get);

router.post('/week/update', authorisationCheck, weekController.week_updateEntries_post);

router.delete('/week/deleteAll', authorisationCheck, weekController.week_deleteAll);
router.delete('/week/deleteDay', authorisationCheck, weekController.week_deleteDay);
router.delete('/week/deleteEntry', authorisationCheck, weekController.week_deleteEntry);

module.exports = router;