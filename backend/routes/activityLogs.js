const express = require('express');
const router = express.Router();
const activityLogsController = require('../controllers/activityLogsController');

// Route to fetch activity logs
router.get('/', activityLogsController.fetchActivityLogs);

module.exports = router;
