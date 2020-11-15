const express = require('express');
const controllers = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post('/register', controllers.registerUser);

authRoutes.post('/login', controllers.login);

module.exports = authRoutes;