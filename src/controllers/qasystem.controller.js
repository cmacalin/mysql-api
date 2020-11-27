const mysql = require('mysql');
const query = require('../utils/query');
const connection = require("../db-config");
const escape = require('../utils/escape');
const {ALL_TASKS, DELETE_TASK, UPDATE_TASK, ADD_TASK, SINGLE_TASK} = require('../queries/qasystem.queries');
const {serverError} = require('../utils/handlers');

// CRUD Functions
exports.getAllTasks = async(request, response) => {
    const con = await connection().catch((error) => {
        console.log('hi1');
        throw error;
    })
    console.log('eth');
    console.log(request.user);
    const tasks = await query(con, ALL_TASKS(request.user.id)).catch(serverError(response));

    if (tasks.length) {
        response.json(tasks);
    } else {
        console.log('hi2');
        response.status(200).json({message: 'You don\'t have any tasks yet'});
    }
};

exports.getTask = async(request, response) => {
    const con = await connection().catch((error) => {
        console.log('hi3');
        throw error;
    })

    const task = await query(con, SINGLE_TASK(request.user.id, request.params.systemId)).catch(serverError(response));

    if (task.length) {
        response.json(task);
    } else {
        console.log('hi4');
        response.status(400).json({message: 'Task not found'});
    }
};

exports.createTask = async(request, response) => {
    console.log(request.body);
    const user = request.user;
    if (user.id) {
        const con = await connection().catch((error) => {
            console.log('hi5');
            throw error;
        })

        const task_name = request.body.name;
        const task_status = request.body.status;
        console.log('Name: ' + task_name);
        const result = await query(con, ADD_TASK(user.id, task_name, task_status)).catch(serverError(response));

        if (result.affectedRows == 1) {
            response.json({message: "System task added"});
        } else {
            console.log('hi6');
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
        console.log('hi7');
        throw error;
    })
    const values = _buildValuesString(request);

    const result = await query(con, UPDATE_TASK(request.user.id, request.params.taskId, values)).catch((error) => {
        console.log('hi8');
        response.send(error);
    });

    if (result.affectedRows == 1) {
        response.json(result);
    } else {
        console.log('hi9');
        response.status(500).json({message: `Unable to update task: '${request.body.task_name}'`});
    }
};

exports.deleteTask = async(request, response) => {
    const con = await connection().catch((error) => {
        console.log('hi10');
        throw error;
    })

    const result = await query(con, DELETE_TASK(request.user.id, request.params.taskId)).catch((error) => {
        console.log('hi11');
        response.json(error);
    });
    console.log(result);

    if (result.affectedRows == 1) {
        response.json({message: "System task successfully deleted"});
    } else {
        console.log('hi12');
        response.status(500).json({message: 'Unable to delete selected task'});
    }
};