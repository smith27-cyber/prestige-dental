
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.loginUser);

// Password reset route
router.post('/reset-password', authController.resetPassword);

module.exports = router;
