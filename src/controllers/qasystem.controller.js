const query = require('../utils/query');
const connection = require("../db-config");
const {ALL_TASKS, DELETE_TASK, UPDATE_TASK, ADD_TASK, SINGLE_TASK} = require('../queries/qasystem.queries');

// CRUD Functions
exports.getAllTasks = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })

    const tasks = await query(con, ALL_TASKS).catch((error) => {
        response.send(error);
    });

    if (tasks.length) {
        response.send(tasks);
    }
};

exports.getTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })

    const task = await query(con, SINGLE_TASK, [request.params.systemId]).catch((error) => {
        response.send(error);
    });

    if (task.length) {
        response.send(task);
    }
};

exports.createTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })

    const result = await query(con, ADD_TASK, [request.body.name, request.body.status]).catch((error) => {
        response.send(error);
    });
    console.log(result);

    if (result.affectedRows == 1) {
        response.json({message: "System task added"});
    }
};

exports.updateTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })

    const result = await query(con, UPDATE_TASK, [request.body.name, request.body.status, request.params.systemId]).catch((error) => {
        response.send(error);
    });
    console.log(result);

    if (result.affectedRows == 1) {
        response.json(result);
    }
};

exports.deleteTask = async(request, response) => {
    const con = await connection().catch((error) => {
        throw error;
    })

    const result = await query(con, DELETE_TASK, [request.params.systemId]).catch((error) => {
        response.send(error);
    });
    console.log(result);

    if (result.affectedRows == 1) {
        response.json({message: "System task successfully deleted"});
    }
};
