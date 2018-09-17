const mysql = require("mysql");

require("dotenv").config({ path: ".env.development" });

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "portfolio"
});

module.exports = connection;
