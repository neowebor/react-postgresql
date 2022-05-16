const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "react_postgresql",
  password: "root",
  port: 5432,
});

pool.connect();

module.exports = pool;
