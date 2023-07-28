const registerUserController = (req, res) => {
    const data = req.session.data;
    res.render('registerUser', {context: data});
}


const registerCompanyController = (req, res) => {
    const data = req.session.data;
    res.render('registerCompany', {context: data});
}


module.exports = { registerUserController, registerCompanyController };
