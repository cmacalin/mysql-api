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

exports.GET_USER_BY_USER_ID = `SELECT user_id, username, email, first_name FROM users WHERE user_id = ?`;

exports.GET_USER_BY_USERNAME = `SELECT user_id, username, email, first_name FROM users WHERE username = ?`;

exports.GET_USER_BY_USER_ID_WITH_PW = `SELECT * FROM users WHERE user_id = ?`;

exports.GET_USER_BY_USERNAME_WITH_PW = `SELECT * FROM users WHERE username = ?`;

// Add new user with valid information (registration)
exports.INSERT_NEW_USER = `INSERT INTO users (username, email, first_name, last_name, password) VALUES (?, ?, ?, ?, ?)`;

// Update existing user information
exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, password = ? WHERE user_id = ?`;

// Delete user if they choose to close their account
exports.DELETE_USER = `DELETE FROM users WHERE user_id = ?`;
