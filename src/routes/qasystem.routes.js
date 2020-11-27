const express = require('express');
const {getAllTasks, createTask, getTask, deleteTask, updateTask} = require('../controllers/qasystem.controller');
const accessible = require('../middleware/auth.middleware');
const systemRoutes = express.Router();

systemRoutes.get('/', accessible, getAllTasks).post('/', accessible, createTask);

// Methods for calling API
systemRoutes.get('/:systemId', accessible, getTask)
systemRoutes.put('/:systemId', accessible, updateTask)
systemRoutes.delete('/:systemId', accessible, deleteTask);

module.exports = systemRoutes;      // Makes this an exposed module that can be accessed