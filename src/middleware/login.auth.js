const client = require('../config/redisConfig');
const jwt = require('jsonwebtoken');

const jwtAuth = async(req, res, next) => {
    /*
        1. Middleware usado para add. tokens gerados no
        login ao set de tokens válidos.
    */
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');

    const invalidToken = await client.sIsMember('invalid_tokens', token);
    if(invalidToken) return res.status(401).json({message: "Token inválido"})
    
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if(err) return res.status(500).json({message: "Falha na autenticação"})
        req.userId = decoded.id;
        req.username = decoded.username;

        await client.multi()
            .sAdd('valid_tokens', token)
            // .expire('valid_tokens', 10)
                //Expiração aplicado p/ tds os membros do set
            .exec((err, replies) => {
                if(err) console.log(err);
                if(replies) console.log(err);
            });
        next();
    });
}

module.exports = jwtAuth;
