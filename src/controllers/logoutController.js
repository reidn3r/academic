// const logoutModel = require('../model/Logout');

const logoutController = async(req, res) => {
    const token = req.cookies.loginToken;

    res.clearCookie('loginToken');
    res.status(200).redirect('/v1');
}

module.exports = logoutController;