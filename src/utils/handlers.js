exports.serverError = (response) => (error) => {
    console.log(error);
    response.status(500);
    response.json({
        error: {
            message: error.message
        },
        message: 'Server call not processed. Please try again later.'
    });
}