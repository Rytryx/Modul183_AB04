const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, './db/database.db');

const insertUser = (username, hashedPassword) => {
  const db = new sqlite3.Database(dbPath);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';

  const params = [username, hashedPassword];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`User ${username} added to the database`);
    }

    db.close();
  });
};

module.exports = { insertUser };
