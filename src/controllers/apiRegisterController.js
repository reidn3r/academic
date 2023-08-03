const cpfValidation = require('../public/utils/CPFisValid');
const cnpjValidation = require('../public/utils/CNPJisValid');
const dateFormat = require('../public/utils/dateFormat');
const cleanString = require('../public/utils/cleanString');

const universityModel = require('../model/University');
const stateModel = require('../model/State_Info');
const registerModel = require('../model/Register');
const userModel = require('../model/User');
const CompanyModel = require('../model/Company');

const sequelize = require('../config/dbConfig');

const registerUser = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');

    const { nameInput, emailInput, cpfInput, birthInput, universityInput, cityInput, stateInput, optradio} = req.body;
    
    if(!cpfValidation(cpfInput)) return res.status(401).json({message: "CPF inválido"});
    const cleanCpfInput = cleanString(cpfInput);
    
    const foundUniversity = await universityModel.findOne({where: {university_name: universityInput}});
    if(!foundUniversity) return res.status(404).json({message: "Insira uma universidade válida"});
    
    const foundState = await stateModel.findOne({where: {state_name: stateInput}});
    if(!foundState) return res.status(404).json({message: "Insira um estado válido"});
    
    const [results, metadata] = await sequelize.query(`SELECT * FROM city_info WHERE city_name LIKE '${cityInput}' AND state_id = ${foundState.id} LIMIT 1`);
    if(results.length == 0) return res.status(404).json({message: "Insira uma cidáde válida"});
    
    const user_activity_id = optradio == "bolsista" ? 1 : optradio == "pesquisador" ? 2 : 3;
    
    const newRegister = await registerModel.create({ id_register_type: 1 });
    await userModel.create({
        register_id: newRegister.id,
        university_id: foundUniversity.id,
        user_activity_id: user_activity_id,
        name: nameInput,
        email: emailInput,
        password: data.hashPw,
        city_id: results[0].id,
        state_id: foundState.id,
        cpf: cleanCpfInput,
        created_at: dateFormat(new Date()),
        birthday: birthInput
    })
    
    //criar novo perfil
    res.redirect('/v1');
}

const registerCompany = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');

    const { nameInput, emailInput, cnpjInput, birthInput, cityInput, stateInput, optradio} = req.body;    
    
    // const body = req.body;
    if(!cnpjValidation(cnpjInput)) return res.status(404).json({message: "CNPJ inválido"});
    const cleanCnpjInput = cleanString(cnpjInput);
    
    const foundState = await stateModel.findOne({where: {state_name: stateInput}});
    if(!foundState) return res.status(404).json({message: "Insira um estado válido"});
    
    const [results, metadata] = await sequelize.query(`SELECT * FROM city_info WHERE city_name LIKE '${cityInput}' AND state_id = ${foundState.id} LIMIT 1`);
    if(results.length == 0) return res.status(404).json({message: "Insira uma cidáde válida"});
    
    const newRegister = await registerModel.create({ id_register_type: 2 });
    
    await CompanyModel.create({
        register_id: newRegister.id,
        name: nameInput,
        email: emailInput,
        password: data.hashPw,
        city_id: results[0].id,
        state_id: foundState.id,
        cnpj: cleanCnpjInput,
        created_at: dateFormat(new Date()),
    });
    
    //criar novo perfil
    res.redirect('/v1');
}

//CNPJ COMO STRING 
module.exports = { registerUser, registerCompany };