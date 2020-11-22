const {getAllTasks, createTask, getTask, deleteTask, updateTask} = require('../controllers/qasystem.controller');
const express = require('express');
// const accessible = require('../middleware/auth.middleware');
const systemRoutes = express.Router();

systemRoutes.get('/', getAllTasks).post('/', createTask);

// Methods for calling API
systemRoutes.get('/:systemId', getTask)
systemRoutes.put('/:systemId', updateTask)
systemRoutes.delete('/:systemId', deleteTask);

module.exports = systemRoutes;      // Makes this an exposed module that can be accessed