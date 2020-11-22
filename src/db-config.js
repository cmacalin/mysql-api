const mysql = require('mysql');
const {CREATE_SYSTEM_TABLE} = require('./queries/qasystem.queries');
const {CREATE_USERS_TABLE} = require('./queries/user.queries');
const query = require('./utils/query');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || 'password';
const database = process.env.DB_DATABASE || 'tododb';

const connection = async () =>
    new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host,
            user,
            password,
            database,
            port: 3306
        });
        con.connect((error) => {
            if(error) {
                reject(error);
                return;
            }
        });
        console.log('Connected');
        resolve(con);
});

(async () => {
    const _con = await connection().catch((error) => {
        throw error;
    });

    const userDbCreated =  await query(_con, CREATE_SYSTEM_TABLE).catch (
        (error) => {
            console.log(error);
        }
    );

    const systemDbCcreated = await query(_con, CREATE_USERS_TABLE).catch (
        (error) => {
            console.log(error);
        }
    );

    if(!!userDbCreated && !!systemDbCcreated) {
        console.log('All database tables created');
    }
})();

module.exports = connection;