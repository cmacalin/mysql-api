// Handle 404 error
exports.error404 = (req, res, next) => {
    next({message: 'Not Found :(', status: 404});
};

// Handle 500 error
exports.error500 = (error, req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.status(error.status || 500);
    console.log(error);
    res.json({
        error: {
            message: error.message
        }
    });
};