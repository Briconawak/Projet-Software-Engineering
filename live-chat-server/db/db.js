// db.js
const postgres = require('postgres');

const sql = postgres({
    host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,                   // Postgres server port[s]
    database             : 'postgres',             // Name of database to connect to
    username             : 'postgres',             // Username of database user
    password             : '12345678',
})

module.exports = sql;