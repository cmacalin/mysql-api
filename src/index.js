const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const systemRoutes = require('./routes/qasystem.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const {error404, error500} = require('./middleware/errors.middleware');

const app = express();      // express needs to be initialized
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;

if (env != 'test') {
    app.use(logger(logLevel));
}

// Middleware
app.use(parser.json());
app.use(parser.urlencoded({extended: false }));

// Allow cross-origin calls from a different port
app.use(cors());

// HANDLING ROUTES FOR SYSTEM
// Handle routes for system tasks
app.use('/api/qasystem', systemRoutes); // http://localhost:3000/qasystem

// Handle routes for user tasks
app.use('/api/user', userRoutes);       // http://localhost:3000/user

// Handle routes for authentication
app.use('/api/auth', authRoutes);       //http://localhost:3000/auth

// Handle server error requests
app.use(error404);   // Handles pages/routes that may not yet exist
app.use(error500);   // Handles server side issues

// Listen on server port
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})
