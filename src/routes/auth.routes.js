const express = require('express');
const {registerUser, login, logout, token} = require('../controllers/auth.controller');

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);

authRoutes.post('/login', login);

// authRoutes.post('/logout', logout);

// authRoutes.post('/token', token);

module.exports = authRoutes;