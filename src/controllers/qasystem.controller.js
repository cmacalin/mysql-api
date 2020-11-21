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
    console.log('hi');
    con.query(queries.SINGLE_TASK, [request.params.systemId], function(error, result) {
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
                console.log('resp: ' + response.status);
                response.send(error);
            }
            response.json({message: "Task added successfully"});
        }
    );
};

exports.updateTask = function(request, response) {
  con.query(
      queries.UPDATE_TASK,
      [request.body.name, request.body.status, request.params.systemId],
      function(error, data) {
          if(error) {
            response.send(error);
          }
          response.json({message: "Task updated successfully"});
      }
    );
};

exports.deleteTask = function(request, response) {
    con.query(queries.DELETE_TASK,
        [request.params.systemId],
        function(error) {
        if(error) {
            response.send(error);
        }
        response.json({message: "Task deleted"});
    });
};