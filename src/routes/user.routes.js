const express = require('express');

const controllers = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');

const userRoutes = express.Router();


userRoutes.get('/currentUser', controllers.getCurrentUser);
userRoutes.post('/currentUser/update', verifyToken, authController.updateUser);

module.exports = userRoutes;      // Makes this an exposed module that can be accessed