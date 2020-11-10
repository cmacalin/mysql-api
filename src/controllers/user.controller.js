const con = require('../db-config');
const queries = require('../queries/user.queries');

// CRUD Functions
exports.getAllUsers = function(request, response) {
    con.query(queries.ALL_USERS, function(error, result) {
        if(error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.getUser = function(request, response) {
    con.query(queries.SINGLE_USER, function(error, result) {
        if(error) {
            response.send(error);
        }
        response.json(result);
    });
};

exports.createUser = function(request, response) {
    con.query(queries.ADD_USER, function(error, result) {
        if(error) {
            response.send(error);
        }
        response.json(result);
        response.json({ message: 'Number of records added: ' + result.rowsAffected });
    });
};

exports.updateUser = function(request, response) {
  con.query(
      queries.UPDATE_USER,
      [request.body.name, request.body.status, request.params.userId],
      function(error, data) {
          if(error) {
            response.send(error);
          }
          response.json(data);
      }
    );
};

exports.deleteUser = function(request, response) {
    con.query(queries.DELETE_USER,
        [request.params.userId],
        function(error) {
        if(error) {
            response.send(error);
        }
        response.json({message: "Task deleted"});
    });
};