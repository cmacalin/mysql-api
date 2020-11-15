exports.GET_USER_BY_USER_ID = `SELECT user_id, username, email, first_name FROM users WHERE user_id = ?`;

exports.GET_USER_BY_USERNAME = `SELECT user_id, username, email, first_name FROM users WHERE username = ?`;

exports.GET_USER_BY_USER_ID_WITH_PW = `SELECT * FROM users WHERE user_id = ?`;

exports.GET_USER_BY_USERNAME_WITH_PW = `SELECT * FROM users WHERE username = ?`;