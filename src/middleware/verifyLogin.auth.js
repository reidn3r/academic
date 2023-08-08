const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'config.env')});

const verifyLogin = (req, res, next) =>{
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(decoded) return res.status(200).redirect('/v1');
        })
    }
    next();
}


module.exports = verifyLogin;