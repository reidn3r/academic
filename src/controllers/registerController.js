// const session = require('express-session');
const bcrypt = require('bcrypt');

// models
const universityModel = require('../model/University');
const cityModel = require('../model/City_Info');
const stateModel = require('../model/State_Info');
const UserModel = require('../model/User');
const CompanyModel = require('../model/Company');

const registerUserController = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');
    const foundUniversities = await universityModel.findAll({ attributes: ['university_name']});
    const foundCities = await cityModel.findAll({ attributes: ['city_name']});
    const foundStates = await stateModel.findAll({ attributes: ['state_name']});
    res.render('registerUser', {context: data, foundUniversities, foundCities, foundStates});
}

const registerPage = (req, res) => {
    res.render('register');
}

const registerCompanyController = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');
    const foundUniversities = await universityModel.findAll({ attributes: ['university_name']});
    const foundCities = await cityModel.findAll({ attributes: ['city_name']});
    const foundStates = await stateModel.findAll({ attributes: ['state_name']});
    res.render('registerCompany', {context: data, foundUniversities, foundCities, foundStates});
}

const registerMainController = async(req, res) => {
    const { nameInput, emailInput, pwInput, confirmPwInput, optradio } = req.body;
    if(!nameInput || !emailInput || !pwInput || !confirmPwInput || !optradio ) return res.status(401).json({message: "missing data"})
    
    if(pwInput.length < 6) return res.status(401).json({message: "Senha deve ter pelo menos 6 caracteres."});
    
    if(pwInput !== confirmPwInput) return res.status(401).json({message: "As senhas devem serem iguais"});
    const hashPw = await bcrypt.hash(pwInput, 15);
    
    const foundCompanyEmail = await CompanyModel.findOne({where: {email:emailInput}});
    const foundUserEmail = await UserModel.findOne({where: {email:emailInput}});
    if(foundUserEmail || foundCompanyEmail) return res.status(401).json({message: "Email ja cadastrado"});
    
    req.session.userData = { nameInput, emailInput, hashPw, optradio };
    if(optradio == "pessoa"){
        return res.redirect('register/user');
    } 
    else if(optradio == 'empresa'){
        return res.redirect('register/company');
    }
    else{
        return res.status(401).json({message: "Pessoa ou empresa deve ser selecionado"})
    }
}

module.exports = { registerPage, registerMainController,  registerUserController, registerCompanyController };
