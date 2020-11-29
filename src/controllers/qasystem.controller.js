const mysql = require('mysql');
const query = require('../utils/query');
const connection = require("../db-config");
const escape = require('../utils/escape');
const {ALL_TASKS, DELETE_TASK, UPDATE_TASK, ADD_TASK, SINGLE_TASK} = require('../queries/qasystem.queries');
const {serverError} = require('../utils/handlers');

// CRUD Functions
exports.getAllTasks = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })
    const tasks = await query(con, ALL_TASKS(request.user.id)).catch(serverError(response));

    if (tasks.length) {
        response.json(tasks);
    } else {
        response.status(200).json({message: 'You don\'t have any tasks yet'});
    }
};

exports.getTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })

    const task = await query(con, SINGLE_TASK(request.user.id, request.params.systemId)).catch(serverError(response));

    if (task.length) {
        response.json(task);
    } else {
        response.status(400).json({message: 'Task not found'});
    }
};

exports.createTask = async(request, response) => {
    const user = request.user;
    if (user.id) {
        const con = await connection().catch((error) => {
            throw error;
        })

        const task_name = request.body.name;
        console.log('name: ' + task_name);
        const task_status = request.body.status;
        console.log('Name: ' + task_name);
        const result = await query(con, ADD_TASK(user.id, task_name, task_status)).catch(serverError(response));

        if (result.affectedRows == 1) {
            response.json({message: "System task added"});
        } else {
            response.status(500).json({message: `Unable to add task: ${task_name}`});
        }
    }
};

const _buildValuesString = (request) => {
    const body = request.body;
    const values_string = Object.keys(body).map(
        (key) => `${key} = ${escape(body[key])}`
    );
    values_string.push(`created_date = NOW()`); // update current date and time
    values_string.join(', '); // make into a string
    return values_string;
};

exports.updateTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })
    const values = _buildValuesString(request);

    const result = await query(con, UPDATE_TASK(request.user.id, request.params.systemId, values)).catch((error) => {
        response.send(error);
    });

    if (result.affectedRows == 1) {
        response.json(result);
    } else {
        response.status(500).json({message: `Unable to update task: '${request.body.task_name}'`});
    }
};

exports.deleteTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })
    const result = await query(con, DELETE_TASK(request.user.id, request.params.systemId)).catch((error) => {
        response.json(error);
    });

    if (result.affectedRows == 1) {
        response.json({message: "System task successfully deleted"});
    } else {
        response.status(500).json({message: 'Unable to delete selected task'});
    }
};

exports.deleteAllTasks = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })
    const result = await query(con, DELETE_ALL_TASKS(request.user.id)).catch((error) => {
        response.json(error);
    })

    if(result.affectedRows > 0) {
        response.json({message: "All your tasks have been successfully deleted"});
    } else {
        response.json({message: "There were no tasks to delete"});
    }
}