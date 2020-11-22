const jwt = require('jsonwebtoken');

const jwtconfig = {
    access: 'accesssecret',
    refresh: 'refreshsecret',
};

// Array to store created refresh tokens
const refreshTokens = [];

// create new auth token
const generateAccessToken = (id, expiresIn) =>
    jwt.sign({ id }, jwtconfig.access, expiresIn);

// create a new re-auth token
const generateRefreshToken = (id, expiresIn) =>
    jwt.sign({ id }, jwtconfig.refresh, expiresIn);

// check token validity
const verifyToken = (token, secret, req, res) => {
    try {
        return jwt.verify(token, secret);
    } catch {
        res.status(500).send({ auth: false, message: 'Invalid token.' });
    }
};

module.exports = {
    jwtconfig,
    refreshTokens,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};