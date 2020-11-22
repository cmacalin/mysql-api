// Add new user with valid information (registration)
exports.INSERT_NEW_USER = `INSERT INTO users (username, email, first_name, last_name, password) VALUES (?, ?, ?, ?, ?)`;

// Update existing user information
exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, password = ? WHERE user_id = ?`;

// Delete user if they choose to close their account
exports.DELETE_USER = `DELETE FROM users WHERE user_id = ?`;
