// const logoutModel = require('../model/Logout');
const client = require('../config/redisConfig');

const logoutController = async(req, res) => {
    const token = req.cookies.loginToken;
    const tokenExists = await client.sIsMember('valid_tokens', token);
    
    if(tokenExists){
        await client.multi()
            .sMove('valid_tokens', 'invalid_tokens', token)
            // .expire('invalid_tokens', 5)
                //Expiração aplicado p/ tds os membros do set

            .exec()
    }
    console.log(tokenExists);
    
    res.clearCookie('loginToken');
    res.status(200).redirect('/v1');
}

module.exports = logoutController;