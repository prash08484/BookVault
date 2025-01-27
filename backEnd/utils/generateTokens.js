const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });
    // [nodejs] is here secret key 

}

module.exports = generateToken;