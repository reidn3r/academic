const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    /*
        - Verifica se o usuário é autorizado 
        a entrar em uma rota do tipo /index/:id
    */
    const { id } = req.params;
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');
    
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!decoded){
            req.auth = false;
            return res.redirect('/v1/logout');
        }
        req.auth = decoded.profile_id == id ? true : false;
        res.locals.userRegisterId = decoded.profile_id;
    })

    next();
}

module.exports = verifyAuth;