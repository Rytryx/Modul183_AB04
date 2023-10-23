const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmNvIiwiaWF0IjoxNjk4MDc3MzMwLCJleHAiOjE2OTgwODA5MzB9.O18rF1kFBqdi0uasSMa47wstESUhOO0k4YKacq0ejko'; 

const decodedToken = jwt.verify(token, 'dein_geheimes_geheimnis');

console.log(decodedToken);