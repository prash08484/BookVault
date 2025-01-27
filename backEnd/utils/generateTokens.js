const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'nodejs', {
        expiresIn: '30d'
    });
    // [nodejs] is here secret key 

}

module.exports = generateToken;