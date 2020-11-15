const mysql = require('mysql');
const queries = require('./queries/qasystem.queries');
const userQueries = require('./queries/user.queries');
const authQueries = require('./queries/auth.queries');

const host = process.env.DB_HOST || 'localhost';

const user = process.env.DB_USER || 'root';

const password = process.env.DB_PASS || 'password';

const database = process.env.DB_DATABASE || 'tododb';

const con = mysql.createConnection({
    host,
    user,
    password,
    database,
    port: 3306
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

    con.query(authQueries.CREATE_USERS_TABLE, function(error, result) {
        if(error) {
            throw error;
        }
        console.log('User table created or already exists.')
    })
});

module.exports = con;