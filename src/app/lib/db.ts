/* Documentation: https://sidorares.github.io/node-mysql2/docs/documentation/typescript-examples */

import mysql, { PoolOptions } from 'mysql2';

const access: PoolOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export const pool = mysql.createPool(access);

module.exports = pool;