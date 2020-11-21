const con = require('../db-config');
const queries = require('../queries/qasystem.queries');

// CRUD Functions
exports.getAllTasks = function(request, response) {
    con.query(queries.ALL_TASKS, function(error, result) {
        if(error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.getTask = function(request, response) {
    con.query(queries.SINGLE_TASK, function(error, result) {
        if(error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.createTask = function(request, response) {
    con.query(
        queries.ADD_TASK,
        [request.body.name, request.body.status],
        function(error, result) {
            if(error) {
                console.log(error);
                response.send(error);
            }
            response.json(result);
        }
    );
};

exports.updateTask = function(request, response) {
  con.query(
      queries.UPDATE_TASK,
      [request.body.name, request.body.status, request.params.taskId],
      function(error, data) {
          if(error) {
            response.send(error);
          }
          response.json(data);
      }
    );
};

exports.deleteTask = function(request, response) {
    con.query(queries.DELETE_TASK,
        [request.params.taskId],
        function(error) {
        if(error) {
            response.send(error);
        }
        response.json({message: "Task deleted"});
    });
};