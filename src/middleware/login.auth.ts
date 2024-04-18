import { RedisClient } from '../config/redis-config';
const jwt = require('jsonwebtoken');

export const jwtAuth = async(req, res, next) => {
    /*
        1. Middleware usado para add. tokens gerados no
        login ao set de tokens válidos.
    */
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');

    const invalidToken = await RedisClient.sIsMember('invalid_tokens', token);
    if(invalidToken) return res.status(401).json({message: "Token inválido"})
    
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if(err) return res.status(500).json({message: "Falha na autenticação"})
        req.userId = decoded.id;
        // req.username = decoded.username;

        await RedisClient.multi()
            .sAdd('valid_tokens', token)
            .exec((err, replies) => {
                if(err) console.log(err);
                if(replies) console.log(err);
            });
        next();
    });
}