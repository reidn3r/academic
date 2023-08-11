// const logoutModel = require('../model/Logout');
const client = require('../config/redisConfig');

const logoutController = async(req, res) => {
    const token = req.cookies.loginToken;
    const tokenExists = await client.sIsMember('valid_tokens', token);
    
    if(tokenExists){
        await client.sMove('valid_tokens', 'invalid_tokens', token);
    }    
    res.clearCookie('loginToken');
    res.status(200).redirect('/v1');
}

module.exports = logoutController;