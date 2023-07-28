const universityModel = require('../model/University');

const registerUserController = async(req, res) => {
    const data = req.session.data;
    const foundUniversities = await universityModel.findAll({ attributes: ['university_name']});

    // res.json(foundUniversities);
    res.render('registerUser', {context: data, foundUniversities});
}


const registerCompanyController = (req, res) => {
    const data = req.session.data;
    res.render('registerCompany', {context: data});
}


module.exports = { registerUserController, registerCompanyController };
