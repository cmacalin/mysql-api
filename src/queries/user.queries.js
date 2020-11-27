// Create initial users table to store user information
exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
)`;

exports.GET_USER_BY_USER_ID = (user_id) => `SELECT user_id, username, email, first_name, last_name FROM users WHERE user_id = ${user_id}`;

exports.GET_USER_BY_USERNAME = (username) => `SELECT user_id, username, email, first_name, last_name FROM users WHERE username = ${username}`;

exports.GET_USER_BY_USER_ID_WITH_PW = (user_id) => `SELECT * FROM users WHERE user_id = ${user_id}`;

exports.GET_USER_BY_USERNAME_WITH_PW = (username) => `SELECT * FROM users WHERE username = ${username}`;

// Add new user with valid information (registration)
exports.INSERT_NEW_USER = (username, email, first_name, last_name, password) =>
    `INSERT INTO users (username, email, first_name, last_name, password) VALUES (${username}, ${email}, ${first_name}, ${last_name}, ${password})`;

// Update existing user information
exports.UPDATE_USER = (username, email, first_name, last_name, password, user_id) =>
    `UPDATE users SET username = ${username}, email = ${email}, first_name = ${first_name}, last_name = ${last_name}, password = ${password} WHERE user_id = ${user_id}`;

// Delete user if they choose to close their account
exports.DELETE_USER = (user_id) => `DELETE FROM users WHERE user_id = ${user_id}`;
