const bcrypt = require('bcrypt');

// models
const universityModel = require('../../model/University');
const cityModel = require('../../model/City_Info');
const stateModel = require('../../model/State_Info');
const UserModel = require('../../model/User');

const registerPage = (req, res) => {
    /* 
        autenticação da rota

        1. Se o usuário estiver autenticado,
        não é permitido fazer novo cadastro na plataforma
    */
    const token = req.cookies.loginToken;
    if(token) return res.redirect('/v1/');
    res.render('register');
}

const registerUserController = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');
    const foundUniversities = await universityModel.findAll({ attributes: ['university_name']});
    const foundCities = await cityModel.findAll({ attributes: ['city_name']});
    const foundStates = await stateModel.findAll({ attributes: ['state_name']});
    res.render('registerUser', {context: data, foundUniversities, foundCities, foundStates});
}

const registerMainController = async(req, res) => {
    const { nameInput, emailInput, pwInput, confirmPwInput, userSex } = req.body;

    if(!nameInput || !emailInput || !pwInput || !confirmPwInput || !userSex ) return res.status(401).json({message: "missing data"})
    
    if(pwInput.length < 6) return res.status(401).json({message: "Senha deve ter pelo menos 6 caracteres."});
    
    if(pwInput !== confirmPwInput) return res.status(401).json({message: "As senhas devem serem iguais"});
    const hashPw = await bcrypt.hash(pwInput, 15);
    
    const foundUserEmail = await UserModel.findOne({where: {email:emailInput}});
    if(foundUserEmail) return res.status(401).json({message: "Email ja cadastrado"});
    
    if(!userSex) return res.status(401).json({message: "Masculino ou Feminino deve ser selecionado"})
    
    req.session.userData = { nameInput, emailInput, hashPw, userSex };
    return res.redirect('register/user');
}

module.exports = { registerPage, registerMainController,  registerUserController };
