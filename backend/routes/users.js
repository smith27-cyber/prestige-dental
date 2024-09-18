const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


// Routes for users
router.get('/users', usersController.getUsers);
router.post('/users', usersController.addUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
