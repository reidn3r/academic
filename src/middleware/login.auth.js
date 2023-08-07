const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

    const token = req.cookies.token;
    if(!token) return res.status(401).json({message: "Token inválido"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(500).json({message: "Falha na autenticação"})
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    });
}

module.exports = jwtAuth;