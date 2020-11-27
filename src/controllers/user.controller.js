const bcrypt = require('bcryptjs');
const connection = require("../db-config");
const query = require('../utils/query');
const {GET_USER_BY_USER_ID, GET_USER_BY_USER_ID_WITH_PW, UPDATE_USER} = require('../queries/user.queries');
const escape = require('../utils/escape');

exports.getCurrentUser = async function (request, response) {
    const user = request.user;

    if (user.id) {
        const con = await connection().catch((error) => {
            throw error;
        });

        const existing_user = await query(con, GET_USER_BY_USER_ID(user.id)).catch ((error) => {
                response.status(500).json({message: 'User not found.'});
            }
        )

        if (!existing_user.length) {
            response.status(400).json({message: 'No user found'});
        } else {
            response.status(200).json(existing_user[0]);
        }
    }
}

exports.updateUser = async function (request, response) {
    const con = await connection().catch((error) => {
        throw error;
    });

    const [existing_user] = await query(con, GET_USER_BY_USER_ID_WITH_PW(request.user.id)).catch((error) => {
        response.status(500).json({ message: 'User not retrieved.' });
    });

    const {
        username: existing_username,
        email: existing_email,
        first_name: existing_first_name,
        last_name: existing_last_name,
        password: existing_password
    } = existing_user;

    const {username, email, first_name, last_name, password} = request.body;

    const passwordUnchanged = await bcrypt
        .compare(password, existing_password)
        .catch((error) => {
            console.log(error);
            response.status(500).json({ message: 'Invalid password!' });
        });

    const new_username = username || existing_username;
    const new_email = email || existing_email;
    const new_first_name = first_name || existing_first_name;
    const new_last_name = last_name || existing_last_name;
    const new_password = !passwordUnchanged ? bcrypt.hashSync(password) : existing_password;

    const {
        new_username: escaped_username,
        new_email: escaped_email,
        new_first_name: escaped_first_name,
        new_last_name: escaped_last_name,
        new_password: escaped_password
    } = escape({
        new_username,
        new_email,
        new_first_name,
        new_last_name,
        new_password
    });

    const result = await query(con, UPDATE_USER(escaped_username, escaped_email, escaped_first_name, escaped_last_name, escaped_password, request.user.id)).catch((error) => {
        console.log(error);
        response.status(500).send({ message: 'Could not update user settings.' });
    });

    if (result.affectedRows === 1) {
        response.json({ message: 'User info successfully updated!'});
    } else {
        response.json({ message: 'Nothing to update' });
    }

};