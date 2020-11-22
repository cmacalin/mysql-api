const bcrypt = require('bcryptjs');
const connection = require("../db-config");
const query = require('../utils/query');

const {GET_USER_BY_USERNAME, GET_USER_BY_USERNAME_WITH_PW, INSERT_NEW_USER} = require('../queries/user.queries');
let {refreshTokens, generateAccessToken, generateRefreshToken} = require('../utils/jwt-helpers');

exports.registerUser = async (request, response) => {
    checkAllFields(request, response);
    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const params = [request.body.username, request.body.email, request.body.first_name, request.body.last_name, passwordHash];

    const con = await connection().catch((error) => {
        throw error;
    });

    const user = await query(con, GET_USER_BY_USERNAME, [request.body.username]).catch((error) => {
        response.status(500);
        response.send({message: 'User not retrieved'});
    });

    if (user.length === 1) {
        response.status(403);
        response.send({message: 'User already exists. Please log in.'});
    } else {
        const result = await query(con, INSERT_NEW_USER, params).catch((error) => {
            response.status(500);
            response.send({message: 'Registration could not be completed. Please try again later.'});
        });
        response.send({message: 'User successfully created!'});
    }
}

exports.login = async (request, response) => {
    const con = await connection().catch((err) => {
        throw err;
    });

    // Check for existing user
    const user = await query(con, GET_USER_BY_USERNAME_WITH_PW, [
        request.body.username,
    ]).catch((error) => {
        response.status(500);
        response.send({ message: 'User not retrieved' });
    });

    if (user.length === 1) {
        const validPassword = await bcrypt
            .compare(request.body.password, user[0].password)
            .catch((error) => {
                response.status(500);
                response.json({ message: 'Invalid password!' });
            });

        if (!validPassword) {
            response.status(400);
            response.send({ message: 'Invalid password!' });
        }

        const accessToken = generateAccessToken(user[0].user_id, {
            expiresIn: 86400,
        });
        const refreshToken = generateRefreshToken(user[0].user_id, {
            expiresIn: 86400,
        });

        refreshTokens.push(refreshToken);

        response.header('access_token', accessToken);
        response.send({
                auth: true,
                message: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
            });
    }
};

exports.token = (request, response) => {
    const refreshToken = request.body.token;

    if (!refreshToken) {
        response.status(401);
        response.send({ auth: false, message: 'Access Denied. No token provided.' });
    }

    if (!refreshTokens.includes(refreshToken)) {
        response.status(403);
        response.send({ message: 'Invalid Refresh Token' });
    }

    const verified = verifyToken(refreshToken, jwtconfig.refresh, request, response);

    if (verified) {
        const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
        response.header('access_token', accessToken);
        response.send({
                auth: true,
                message: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 20,
                refresh_token: refreshToken,
            });
    }
    response.status(403);
    response.send({ msg: 'Invalid Token' });
};

exports.logout = (request, response) => {
    const refreshToken = request.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    response.send({message: 'User has been logged out'});
};

checkAllFields = function(request, response){
    if (!request.body.password || !request.body.username || !request.body.first_name || !request.body.last_name || !request.body.email) {
        response.status(500);
        response.json({msg: "Some information is missing. Please try again."});
    }
}