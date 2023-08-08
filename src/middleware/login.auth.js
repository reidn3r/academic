const client = require('../config/redisConfig');
const jwt = require('jsonwebtoken');

const jwtAuth = async(req, res, next) => {
    const token = req.cookies.loginToken;
    if(!token) return res.status(401).json({message: "Token inválido"});
    
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if(err) return res.status(500).json({message: "Falha na autenticação"})
        req.userId = decoded.id;
        req.username = decoded.username;

        //Inserção de sets no banco de dados
        client.sAdd('valid_tokens', token);
        console.log(`Redis: OK`);

        //criar perfil
            //add. info de login

        next();
    });
}

module.exports = jwtAuth;
