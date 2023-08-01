const session = require('express-session');
const universityModel = require('../model/University');
const cityModel = require('../model/City_Info');
const stateModel = require('../model/State_Info');

const registerUserController = async(req, res) => {
    const data = req.session.userData;
    const foundUniversities = await universityModel.findAll({ attributes: ['university_name']});
    const foundCities = await cityModel.findAll({ attributes: ['city_name']});
    const foundStates = await stateModel.findAll({ attributes: ['state_name']});
    res.render('registerUser', {context: data, foundUniversities, foundCities, foundStates});
}

const registerCompanyController = (req, res) => {
    const data = req.session.userData;
    res.render('registerCompany', {context: data});
}


module.exports = { registerUserController, registerCompanyController };
