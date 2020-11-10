// Create initial task table
exports.CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS users(
    id int NOT NULL AUTO_INCREMENT,
    full_name varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    access_level varchar(10) DEFAULT 'viewer',
    PRIMARY KEY (id)
)`;

// Get all tasks in table
exports.ALL_USERS = `SELECT * FROM users`;

// Get 1 task from tablet
exports.SINGLE_USER = `SELECT * FROM users WHERE id = ?`;

// Adds a new system task
exports.ADD_USER = `INSERT INTO users (name) VALUES (?)`;

// Update existing task within table
exports.UPDATE_USER = `UPDATE users SET name = ?, status = ? WHERE id = ?`;

// Delete a task using primary key (id)
exports.DELETE_USER = `DELETE FROM users WHERE id = ?`;
