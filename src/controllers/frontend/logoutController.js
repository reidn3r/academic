const jwt = require('jsonwebtoken');

const client = require('../../config/redisConfig');
const dateFormat = require('../../public/utils/dateFormat');
const logoutModel = require('../../model/Logout');

const logoutController = async(req, res) => {
    //Verifica se existe o token de login
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');

    //Salvar info de logout no banco de dados
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        if(decoded){
            await logoutModel.create({
                login_id: decoded.login_id,
                profile_id: decoded.logout_profile_id,
                logout_date: dateFormat(new Date())
            })
        }
    })
    
    //Invalida o token movendo para o set de tokens inválidos
    const tokenExists = await client.sIsMember('valid_tokens', token);
    if(tokenExists){
        await client.sMove('valid_tokens', 'invalid_tokens', token);
    }    

    //Exclui o token e faz o redirect
    res.clearCookie('loginToken');
    return res.status(200).redirect('/v1');
}

module.exports = logoutController;