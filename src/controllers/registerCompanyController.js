
const registerCompanyController = (req, res) => {
    const data = req.session.data;
    res.json({message: data});
}

module.exports = registerCompanyController;