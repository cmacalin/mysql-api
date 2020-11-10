const controllers = require('../controllers/qasystem.controller');
const express = require('express');

const systemRoutes = express.Router();


systemRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);

// Methods for calling API
systemRoutes.get('/:systemId', controllers.getTask)
systemRoutes.put('/:systemId', controllers.updateTask)
systemRoutes.delete('/:systemId', controllers.deleteTask);

module.exports = systemRoutes;      // Makes this an exposed module that can be accessed