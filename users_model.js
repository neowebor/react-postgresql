const db = require("./db");

const createUser = async (data) => {
  const { name, email } = data;
  await db.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
};

const getUsers = async () => {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM users", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

module.exports = { createUser, getUsers };
