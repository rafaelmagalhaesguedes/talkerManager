const mysql = require('mysql2/promise');

// Config MySQL
const mysqlConfig = {
  host: process.env.MYSQL_HOSTNAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// Create connection pool
const connection = mysql.createPool(mysqlConfig);

module.exports = connection;