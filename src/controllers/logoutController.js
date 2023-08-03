const logoutController = (req, res) => {
    res.status(200).redirect('/');
}

module.exports = logoutController;