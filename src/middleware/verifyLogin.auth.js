const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'config.env')});

const verifyLogin = (req, res, next) =>{
    /* 
        1. Middleware usado na rota de login
            - Se o usuário já está autenticado,
            não é permitido se autenticar novamente
    */
    const token = req.cookies.loginToken;
    if(token) return res.redirect('/v1');
    next();
}


module.exports = verifyLogin;