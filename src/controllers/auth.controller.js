const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const con = require('../db-config');
const jwtconfig = require('../jwt-config');
const authQueries = require('../queries/auth.queries');
const userQueries = require('../queries/user.queries');

exports.registerUser = function(request, response) {
    const passwordHash = bcrypt.hashSync(request.body.password, 10);
    console.log('hi1');
    con.query(
        authQueries.INSERT_NEW_USER,
        [request.body.username, request.body.email, request.body.first_name, request.body.last_name, passwordHash],
        function(error, result) {
            if (error) {
                console.log(error);
                response.status(500);
                response.send({msg: 'Registration could not be completed. Please try again later.'});
            }

            con.query(userQueries.GET_USER_BY_USERNAME, [request.body.username], function(error, user){
                if (error) {
                    response.status(500);
                    response.send({msg: 'User not found.'});
                }

                console.log(user);
                response.send(user);
            });
        }
    )
}

exports.login = function(request, response) {
    con.query(
        userQueries.GET_USER_BY_USERNAME_WITH_PW,
        [request.body.username],
        function(error, user) {
            if (error) {
                console.log(error);
                response.status(500);
                response.send({msg: 'User could not be retrieved'});
            }

            console.log(user);

            bcrypt.compare(request.body.password, user[0].password)
                .then(function(validPassword) {
                    if (!validPassword) {
                        response.status(400).send({msg: 'Password invalid'});
                    }
                    else {
                        const token = jwt.sign({id: user[0].user_id}, jwtconfig.secret);
                        response.header('auth-token', token).send({auth: true, msg: 'Logged in successfully!'});
                    }
                }).catch(console.log);
        }
    )
}

exports.updateUser = function(request, response) {
    console.log(request);
    con.query(
        userQueries.GET_USER_BY_USER_ID_WITH_PW,
        [request.user.id],
        function(error, user) {
            console.log(error);
            if (error) {
                response.status(500);
                response.send({msg: 'Could not get user'});
            }

            const passwordHash = bcrypt.hashSync(request.body.password);
            con.query(
                authQueries.UPDATE_USER,
                [request.body.username, request.body.email, request.body.first_name, request.body.last_name, passwordHash, user[0].user_id],
                function(error, result) {
                    if (error) {
                        console.log(error);
                        response.status(500);
                        response.send({msg: 'Unable to update your information. Please try again later.'});
                    }
                    console.log(result);
                    response.json({msg: 'User information updated.'});
                }
            )
        }
    )
}