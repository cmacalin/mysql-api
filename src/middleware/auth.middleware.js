const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt-config');

module.exports = function(request, response, next) {
    const token = request.headers['auth-token'];

    if (!token) {
        response.status(500);
        response.send({auth: false, msg: 'Access denied.'});
    }

    try {
        const verified = jwt.verify(token, jwtconfig.secret);
        request.user = verified;
        next();
    } catch {
        response.status(400);
        response.send({msg: 'Token not valid.'});
    }
}