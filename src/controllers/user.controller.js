const jwt = require('jsonwebtoken');
const jwtdecode = require('jwt-decode');

const con = require('../db-config');
const jwtconfig = require('../jwt-config');
const queries = require('../queries/user.queries');

exports.getCurrentUser = function(request, response) {
    const token = request.header('auth-token');
    const decoded = jwtdecode(token);

    if (!token) {
        response.status(401);
        response.send({auth: false, msg: 'Access forbidden.'});
    }

    jwt.verify(token, jwtconfig.secret, function(error, decoded) {
        if (error) {
            response.status(500);
            response.send({auth: false, msg: 'Failed to authenticate.'});
        }
    })
    con.query(queries.GET_USER_BY_USER_ID_WITH_PW, [decoded.id], function(error, user) {
        if (error) {
            response.status(500);
            response.send({msg: 'Error trying to find user.'});
        }

        if (!user) {
            response.status(400);
            response.send({msg: 'User not found.'});
        }
        response.status(200);
        response.send(user);
    });
};
