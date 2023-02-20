const express = require('express');
const router = express.Router();

router.use(express.json());

const weekController = require('../controllers/week');

// C
router.post('/week/newWeek', weekController.week_create_post);

// R
router.get('/week/index', weekController.week_indexByUser_get);
router.get('/week/current', weekController.week_currentWeek_get);
router.get('/week/today', weekController.week_currentDay_get);
router.get('/week/detail', weekController.week_detailById_get);
router.get('/week/dailyDetail', weekController.week_dailyDetailById_get);

// U
router.post('/week/update', weekController.week_updateEntry_post);

// D
router.delete('/week/deleteAll', weekController.week_deleteAll);
router.delete('/week/deleteDay', weekController.week_deleteDay);
router.delete('/week/deleteEntry', weekController.week_deleteEntry);

module.exports = router;