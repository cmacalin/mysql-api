const bcrypt = require('bcryptjs');
const query = require('../utils/query');
const connection = require("../db-config");
const {GET_USER_BY_USER_ID, GET_USER_BY_USER_ID_WITH_PW, UPDATE_USER} = require('../queries/user.queries');

exports.getCurrentUser = async(request, response) => {
    const decoded = request.user;

    if (decoded.id) {
        const con = await connection().catch((error) => {
            throw error;
        });

        const user = await query(con, GET_USER_BY_USER_ID, [decoded.id]).catch (
            (error) => {
                response.status(500);
                response.send({message: 'User not found.'});
            }
        )

        if (!user.length) {
            response.status(400);
            response.status.send({message: 'No user found'});
        } else {
            response.status(200);
            response.send(user);
        }
    }
}

exports.updateUser = async function (request, response) {
    const con = await connection().catch((error) => {
        throw error;
    });

    const user = await query(con, GET_USER_BY_USER_ID_WITH_PW, [
        request.user.id,
    ]).catch((error) => {
        response.status(500);
        response.send({ msg: 'User not retrieved.' });
    });

    const passwordUnchanged = await bcrypt
        .compare(request.body.password, user[0].password)
        .catch((error) => {
            response.status(500);
            response.json({ message: 'Invalid password!' });
        });

    if (!passwordUnchanged) {
        const passwordHash = bcrypt.hashSync(request.body.password);

        const result = await query(con, UPDATE_USER, [
            request.body.username,
            request.body.email,
            request.body.first_name,
            request.body.last_name,
            passwordHash,
            user[0].id,
        ]).catch((error) => {
            response.status(500).send({ message: 'Could not update user settings.' });
        });

        if (result.affectedRows === 1) {
            response.json({ msg: 'User info successfully updated!' });
        }
        response.json({ msg: 'No updated info' });
    }
};