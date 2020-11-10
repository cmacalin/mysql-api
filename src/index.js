const express = require('express');
const parser = require('body-parser');

const systemRoutes = require('./routes/qasystem.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();      // express needs to be initialized
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Middleware
app.use(parser.urlencoded({extended: false }));
app.use(parser.json());

// ROUTES FOR SYSTEM

// Handle routes for system tasks
app.use('/qasystem', systemRoutes); // http://localhost:3000/qasystem

// Handle routes for user tasks
app.use('/user', userRoutes);      // http://localhost:3000/user

// Handle errors
app.use(middleware.error404);   // Handles pages/routes that may not yet exist
app.use(middleware.error500);   // Handles server side issues

// List on server port
app.listen(port, function(){
    console.log('Server started at http://localhost: ${port}');
})
