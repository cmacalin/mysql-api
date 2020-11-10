// Handle 404 error
exports.error404 = (req, res, next) => {
    next({ message: 'Not Found', status: 404 });
};

// Handle 500 error
exports.error500 = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
};