const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const con = require('../db-config');
const jwtconfig = require('../jwt-config');
const authQueries = require('../queries/auth.queries');
const userQueries = require('../queries/user.queries');

exports.registerUser = function(request, response) {
    checkAllFields(request, response);

    const passwordHash = bcrypt.hashSync(request.body.password, 10);

    con.query(
        authQueries.INSERT_NEW_USER,
        [request.body.username, request.body.email, request.body.first_name, request.body.last_name, passwordHash],
        function(error, result) {
            if (error) {
                console.log('Error: ' + error);
                response.status(500);
                response.send({msg: 'Registration could not be completed. Please try again later.'});
            }
            else {
                con.query(userQueries.GET_USER_BY_USERNAME, [request.body.username], function(error, user){
                    if (error) {
                        response.status(500);
                        response.send({msg: 'User not found.'});
                    } else {
                        response.send({msg: 'User successfully created!'});
                    }
                });
            }
        }
    )
}

exports.login = function(request, response) {
    if (!request.body.password) {
        response.status(500)
        response.json({msg: "Please enter password"});
    }
    if (!request.body.username) {
        response.status(500)
        response.json({msg: "Please enter username"});
    }

    console.log(request.body);
    con.query(
        userQueries.GET_USER_BY_USERNAME_WITH_PW,
        [request.body.username],
        function(error, user) {
            if (error) {
                console.log(error);
                response.status(500);
                response.send({msg: 'User could not be retrieved'});
            }

            console.log(user[0]);

            bcrypt.compare(request.body.password, user[0].password)
                .then(function(validPassword) {
                    if (!validPassword) {
                        console.log("Password wrong");
                        response.status(400).send({msg: 'Password invalid'});
                    }
                    else {
                        const token = jwt.sign({id: user[0].user_id}, jwtconfig.secret);
                        response.status(200);
                        response.header('auth-token', token).send({auth: true, msg: 'Logged in successfully!'});
                    }
                }).catch(console.log);
        }
    )
}

exports.updateUser = function(request, response) {
    console.log(request);
    checkAllFields(request, response);
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

checkAllFields = function(request, response){

}