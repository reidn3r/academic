const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'config.env')});

const verifyLogin = (req, res, next) =>{
    const token = req.cookies.loginToken;
    if(token) return res.redirect('/v1');
    next();
}


module.exports = verifyLogin;