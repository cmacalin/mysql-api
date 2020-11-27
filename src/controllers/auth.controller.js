const bcrypt = require('bcryptjs');
const connection = require("../db-config");
const query = require('../utils/query');
const escape = require('../utils/escape');

const {GET_USER_BY_USERNAME, GET_USER_BY_USERNAME_WITH_PW, INSERT_NEW_USER} = require('../queries/user.queries');
let {refreshTokens, generateAccessToken, generateRefreshToken} = require('../utils/jwt-helpers');

exports.registerUser = async (request, response) => {
    if (allFieldsFilled(request, response)) {
        const passwordHash = await bcrypt.hash(request.body.password, 10).catch((error) => {
            console.log('blegh');
            console.log(request.body.password);
            console.log(error);
        });
        // const params = [request.body.username, request.body.email, request.body.first_name, request.body.last_name, passwordHash];
        const {username, email, first_name, last_name, password} = escape({...request.body, password: passwordHash});

        const con = await connection().catch((error) => {
            throw error;
        });

        const user = await query(con, GET_USER_BY_USERNAME(username)).catch((error) => {
            response.status(500).json({message: 'User not retrieved'});
        });

        if (user.length === 1) {
            console.log('hi?');
            response.status(403).json({message: 'User already exists. Please log in.'});
        } else {
            const result = await query(con, INSERT_NEW_USER(username, email, first_name, last_name, password)).catch((error) => {
                response.status(500).json({message: 'Registration could not be completed. Please try again later.'});
            });
            if (result.affectedRows === 1) {
                response.json({message: 'User successfully created!'});
            }
        }
    } else {
        response.status(500).json({message: 'Some information is missing. Please try again.'});
    }
}

exports.login = async (request, response) => {
    const{username} = escape(request.body);
    const{password} = request.body;

    const con = await connection().catch((err) => {
        throw err;
    });

    // Check for existing user
    const user = await query(con, GET_USER_BY_USERNAME_WITH_PW(username)).catch((error) => {
        response.status(500).json({ message: 'User not retrieved' });
    });

    if (user.length === 1) {
        const validPassword = await bcrypt.compare(password, user[0].password).catch((error) => {
                response.status(500).json({ message: 'Invalid password!' });
            });

        if (!validPassword) {
            response.status(400).json({ message: 'Invalid password!' });
        }

        const accessToken = generateAccessToken(user[0].user_id, {
            expiresIn: 86400,
        });
        const refreshToken = generateRefreshToken(user[0].user_id, {
            expiresIn: 86400,
        });

        refreshTokens.push(refreshToken);

        response.header('access_token', accessToken).json({
                auth: true,
                message: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
            });
    } // else if user doesn't exist
    else {
        response.status(401).json({message: 'Invalid login'});
    }
};

exports.token = (request, response) => {
    const refreshToken = request.body.token;

    if (!refreshToken) {
        response.status(401).json({ auth: false, message: 'Access Denied. No token provided.' });
    }

    if (!refreshTokens.includes(refreshToken)) {
        response.status(403).json({ message: 'Invalid Refresh Token' });
    }

    const verified = verifyToken(refreshToken, jwtconfig.refresh, request, response);

    if (verified) {
        const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
        response.header('access_token', accessToken).json({
                auth: true,
                message: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 20,
                refresh_token: refreshToken,
            });
    } else {
        response.status(403).json({ msg: 'Invalid Token' });
    }
};

exports.logout = (request, response) => {
    const refreshToken = request.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    response.json({message: 'User has been logged out'});
};

allFieldsFilled = function(request, response){
    if (!request.body.password || !request.body.username || !request.body.first_name || !request.body.last_name || !request.body.email) {
        return false;
    }
    return true;
}