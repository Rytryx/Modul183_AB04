const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const posts = require('./posts');

const dbPath = path.resolve(__dirname, '../db/database.db'); 

const db = new sqlite3.Database(dbPath);

const saltRounds = 10;
const secretKey = 'dein_geheimes_geheimnis'; // Ersetze dies durch ein sicheres Geheimnis

const initializeAPI = async (app) => {
  app.post("/api/login", login);
  app.get("/api/posts", posts.getPosts);
};

const generateToken = (username) => {
  const expirationTime = '1h';

  return jwt.sign({ username }, secretKey, { expiresIn: expirationTime });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    db.get('SELECT password FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Serverfehler" });
      }

      if (!row) {
        return res.status(401).json({ error: "Benutzer nicht gefunden" });
      }

      const hashedPasswordFromDatabase = row.password;

      const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Ungültige Anmeldedaten" });
      }

      const token = generateToken(username);

      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Serverfehler" });
  }
};

module.exports = { initializeAPI };
