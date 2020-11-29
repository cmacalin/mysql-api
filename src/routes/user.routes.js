const express = require('express');

const {getCurrentUser, updateUser, deleteUser} = require('../controllers/user.controller');
const accessible = require('../middleware/auth.middleware');

const userRoutes = express.Router();


userRoutes.get('/currentUser', accessible, getCurrentUser);
userRoutes.put('/currentUser/update', accessible, updateUser);
userRoutes.put('/currentUser/delete', accessible, deleteUser);

module.exports = userRoutes;      // Makes this an exposed module that can be accessed