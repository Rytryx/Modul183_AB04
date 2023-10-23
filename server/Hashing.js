const bcrypt = require('bcrypt');

const password = '1234';

bcrypt.hash(password, 10, function(err, hashedPassword) {
    if (err) {
        console.error(err);
    } else {
        console.log("Das gehashte Passwort ist:", hashedPassword);
    }
});