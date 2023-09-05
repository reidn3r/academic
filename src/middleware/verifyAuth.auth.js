const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    const { id } = req.params;
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        req.auth = decoded.profile_id == id ? true : false;
    })
    next();
}

module.exports = verifyAuth;