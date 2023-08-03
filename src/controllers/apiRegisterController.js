// utils
const cpfValidation = require('../public/utils/CPFisValid');
const cnpjValidation = require('../public/utils/CNPJisValid');
const cleanString = require('../public/utils/cleanString');

// services
const universityService = require('../services/universityService');
const locationService = require('../services/locationValidationService');
const stateService = require('../services/stateService');
const registerUserService = require('../services/registerUserService');
const registerCompanyService = require('../services/registerCompanyService');

const registerUser = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');

    const { nameInput, emailInput, cpfInput, birthInput, universityInput, cityInput, stateInput, optradio} = req.body;
    
    if(!cpfValidation(cpfInput)) return res.status(401).json({message: "CPF inválido"});
    const cleanCpfInput = cleanString(cpfInput);
    
    const foundUniversity = await universityService(universityInput);
    if(!foundUniversity) return res.status(404).json({message: "Insira uma universidade válida"});

    const foundState = await stateService(stateInput);
    if(!foundState) return res.status(404).json({message: "Insira um estado válido"});
    
    const locationValidation = await locationService(cityInput, foundState.id);
    if(!locationValidation) return res.status(404).json({message: "Insira uma cidáde válida"});
    
    const user_activity_id = optradio == "bolsista" ? 1 : optradio == "pesquisador" ? 2 : 3;
    
    await registerUserService(foundUniversity.id, user_activity_id, nameInput, emailInput, data.hashPw, locationValidation.id, foundState.id, cleanCpfInput, birthInput);
    
    //criar novo perfil
    res.redirect('/v1');
}

const registerCompany = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');

    const { nameInput, emailInput, cnpjInput, cityInput, stateInput} = req.body;    
    
    if(!cnpjValidation(cnpjInput)) return res.status(404).json({message: "CNPJ inválido"});
    const cleanCnpjInput = cleanString(cnpjInput);
    
    const foundState = await stateService(stateInput);
    if(!foundState) return res.status(404).json({message: "Insira um estado válido"});
    
    const locationValidation = await locationService(cityInput, foundState.id);
    if(!locationValidation) return res.status(404).json({message: "Insira uma cidáde válida"});
    
    await registerCompanyService(nameInput, emailInput, data.hashPw, locationValidation.id, foundState.id, cleanCnpjInput);
        
    //criar novo perfil
    res.redirect('/v1');
}

module.exports = { registerUser, registerCompany };