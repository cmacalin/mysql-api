const mysql = require('mysql');
const queries = require('./queries/qasystem.queries');
const user_queries = require('./queries/user.queries');

const host = process.env.DB_HOST || 'localhost';

const user = process.env.DB_USER || 'root';

const password = process.env.DB_PASS || 'password';

const database = process.env.DB_DATABASE || 'qasystem';

const con = mysql.createConnection({
    host,
    user,
    password,
    database
});

con.connect(function(error) {
    if (error) {
        throw error;
    }
    console.log('Connected');

    con.query(queries.CREATE_SYSTEM_TABLE, function(error, result) {
        if (error) {
            throw error;
        }
        console.log('System table created or already exists.');
    });

    con.query(user_queries.CREATE_USER_TABLE, function(error, result) {
        if(error) {
            throw error;
        }
        console.log('User table created or already exists.')
    })
});

module.exports = con;