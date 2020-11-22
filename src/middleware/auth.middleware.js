const {jwtconfig, verifyToken } = require('../utils/jwt-helpers');

module.exports = (request, response, next) => {
    const authHeader = request.headers['auth-token'] || request.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
        response.status(401);
        response.send({auth: false, message: 'Access Denied. No token provided.'});
    }

    try {
        // verify the token is correct
        const user = verifyToken(accessToken, jwtconfig.access, request, response);
        request.user = user;
        next();
    } catch (err) {
        response.status(403);
        response.send({message: 'Auth token not valid'});
    }
};