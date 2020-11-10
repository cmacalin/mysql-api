const controllers = require('../controllers/user.controller');
const express = require('express');

const userRoutes = express.Router();


userRoutes.get('/', controllers.getAllUsers).post('/', controllers.createUser);

// Methods for calling API
userRoutes.get('/:userId', controllers.getUser)
userRoutes.put('/:userId', controllers.updateUser)
userRoutes.delete('/:userId', controllers.deleteUser);

module.exports = userRoutes;      // Makes this an exposed module that can be accessed