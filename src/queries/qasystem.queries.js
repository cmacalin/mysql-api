// Create initial task table
exports.CREATE_SYSTEM_TABLE = `CREATE TABLE IF NOT EXISTS qasystem(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    status varchar(10) DEFAULT 'pending',
    PRIMARY KEY (id)
)`;

// Get all tasks in table
exports.ALL_TASKS = `SELECT * FROM qasystem`;

// Get 1 task from tablet
exports.SINGLE_TASK = `SELECT * FROM qasystem WHERE id = ?`;

// Adds a new system task
exports.ADD_TASK = `INSERT INTO qasystem (name, status) VALUES (?, ?)`;

// Update existing task within table
exports.UPDATE_TASK = `UPDATE qasystem SET name = ?, status = ? WHERE id = ?`;

// Delete a task using primary key (id)
exports.DELETE_TASK = `DELETE FROM qasystem WHERE id = ?`;
