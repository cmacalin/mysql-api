const express = require('express');

const {getCurrentUser, updateUser} = require('../controllers/user.controller');
const accessible = require('../middleware/auth.middleware');

const userRoutes = express.Router();


userRoutes.get('/currentUser', getCurrentUser);
userRoutes.post('/currentUser/update', accessible, updateUser);

module.exports = userRoutes;      // Makes this an exposed module that can be accessed