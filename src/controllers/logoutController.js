const logoutController = (req, res) => {
    res.clearCookie('login-token');
    res.status(200).redirect('/v1');
}

module.exports = logoutController;