const cpfValidation = require('../public/utils/CPFisValid');
const dateFormat = require('../public/utils/dateFormat');

const universityModel = require('../model/University');
const stateModel = require('../model/State_Info');
const registerModel = require('../model/Register');
const userModel = require('../model/User');

const sequelize = require('../config/dbConfig');

const registerUser = async(req, res) => {
    const body = req.body;
    const city = body.cityInput;
    const state = body.stateInput;
    const cpf = body.cpfInput;

    const data = req.session.userData;

    if(!cpfValidation(cpf)) return res.status(401).json({message: "CPF inválido"});

    const university = body.universityInput;
    const foundUniversity = await universityModel.findOne({where: {university_name: university}});
    if(!foundUniversity) return res.status(401).json({message: "Insira uma universidade válida"});

    const foundState = await stateModel.findOne({where: {state_name: state}});
    if(!foundState) return res.status(401).json({message: "Insira um estado válido"});
    
    const [results, metadata] = await sequelize.query(`SELECT * FROM city_info WHERE city_name LIKE '${city}' AND state_id = ${foundState.id} LIMIT 1`);
    if(results.length == 0) return res.status(401).json({message: "Insira uma cidáde válida"});

    
    const user_activity_id = body.optradio == "bolsista" ? 1 : body.optradio == "pesquisador" ? 2 : 3;
    const newRegister = await registerModel.create({ id_register_type: 1 });
    
    const newUser = await userModel.create({
        register_id: newRegister.id,
        university_id: foundUniversity.id,
        user_activity_id: user_activity_id,
        name: body.nameInput,
        email: body.emailInput,
        password: data.hashPw,
        city_id: results[0].id,
        state_id: foundState.id,
        cpf: intCpf,
        created_at: dateFormat(new Date()),
        birthday: body.birthInput
    })
    
    //criar novo perfil
    res.json({message: `user ${body.nameInput} created.`});
}

module.exports = registerUser;