// Handle 404 error
exports.error404 = (req, res, next) => {
    next({message: 'Not Found :(', status: 404});
};

// Handle 500 error
exports.error500 = (error, req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next({message: error.message, status: 500});
};