// Create initial task table
exports.CREATE_SYSTEM_TABLE = `CREATE TABLE IF NOT EXISTS qasystem(
    system_task_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    name varchar(255) NOT NULL,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    status varchar(20) DEFAULT 'pending',
    PRIMARY KEY (system_task_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// Get all tasks in table
exports.ALL_TASKS = (user_id) => `SELECT * FROM qasystem WHERE user_id = ${user_id}`;

// Get 1 task from table for given user
exports.SINGLE_TASK = (user_id, system_task_id) => `SELECT * FROM qasystem WHERE user_id = ${user_id} AND system_task_id = ${system_task_id}`;

// Adds a new system task
exports.ADD_TASK = (user_id, input_task_name, input_status) => `INSERT INTO qasystem (user_id, name, status) VALUES (${user_id}, '${input_task_name}','${input_status}')`;

// Update existing task within table
exports.UPDATE_TASK = (user_id, system_task_id, input_task_name, input_status) => `UPDATE qasystem SET name='${input_task_name}', status='${input_status}' WHERE user_id=${user_id} AND system_task_id=${system_task_id}`;

// Delete a task using primary key (id)
exports.DELETE_TASK = (user_id, system_task_id) => `DELETE FROM qasystem WHERE user_id=${user_id} AND system_task_id = ${system_task_id}`;

// Delete all of a user's tasks
exports.DELETE_TASKS = (user_id) => `DELETE FROM qasystem WHERE user_id=${user_id}`;