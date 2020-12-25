require('dotenv').config();

const { Pool } = require('pg');

const connectionstring = 'postresql://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
const pool = new Pool({
    connectionString: connectionstring,
});

module.exports = { pool };