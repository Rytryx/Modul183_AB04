const jwt = require('jsonwebtoken');

const secretKey = 'dein_geheimes_geheimnis'; // Ersetze dies durch ein sicheres Geheimnis

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

const getPosts = (req, res) => {
  // Hier kannst du die geschützten Daten liefern
  const posts = [
    {
      id: 1,
      title: "Geschützter Beitrag",
      content: "Dieser Beitrag ist nur für authentifizierte Benutzer sichtbar.",
    },
  ];

  res.json(posts);
};

module.exports = { authenticateJWT, getPosts };
