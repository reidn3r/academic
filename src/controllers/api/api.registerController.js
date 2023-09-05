// utils
const cpfValidation = require('../../public/utils/CPFisValid');
const cleanString = require('../../public/utils/cleanString');
const dateFormat = require('../../public/utils/dateFormat');

// services
const universityService = require('../../services/universityService');
const locationService = require('../../services/locationValidationService');
const stateService = require('../../services/stateService');

// models
const UserModel = require('../../model/User');
const RegisterModel = require('../../model/Register');
const sequelize = require('../../config/sequelizeConfig');

const registerUser = async(req, res) => {
    const data = req.session.userData;
    if(!data) return res.redirect('/v1/register');

    const { nameInput, emailInput, cpfInput, birthInput, universityInput, cityInput, stateInput, userActivity, userGrade, userCourse } = req.body;

    if(!nameInput || !emailInput || !cpfInput || !birthInput || !universityInput || !cityInput || !stateInput || !userActivity || !userGrade, !userCourse) return res.status(404).json({message: "missing data."});

    if(!cpfValidation(cpfInput)) return res.status(401).json({message: "CPF inválido"});
    
    const foundUniversity = await universityService(universityInput);
    if(!foundUniversity) return res.status(404).json({message: "Insira uma universidade válida"});
    
    const foundState = await stateService(stateInput);
    if(!foundState) return res.status(404).json({message: "Insira um estado válido"});
    
    const locationValidation = await locationService(cityInput, foundState.id);
    if(!locationValidation) return res.status(404).json({message: "Insira uma cidáde válida"});
    
    const user_activity_id = userActivity == "bolsista" ? 1 : userActivity == "pesquisador" ? 2 : 3;
    
    const cleanCpfInput = cleanString(cpfInput);
    const newRegister = await RegisterModel.create({ id_register_type: 1 });
    
    const [ gradeQuery, gradeMetadata ] = await sequelize.query(`SELECT * FROM graduate_info WHERE grade="${userGrade}" LIMIT 1`);

    const newUser = await UserModel.create({
        register_id: newRegister.id,
        university_id: foundUniversity.id,
        user_activity_id: user_activity_id,
        name: nameInput,
        email: emailInput,
        password: data.hashPw,
        city_id: locationValidation.id,
        state_id: foundState.id,
        cpf: cleanCpfInput,
        user_sex: data.userSex,
        created_at: dateFormat(new Date()),
        birthday: birthInput,
        user_grade_id: gradeQuery[0].id,
        user_course: userCourse.toLowerCase()
    })


    // req.session.profile_data = {userData: data, profileData: {newUser}};
    req.session.create_profile = {userData: data, profileData: {newUser}};
    req.session.userGrade = gradeQuery[0].id;
    return res.redirect('/v1/create');
    }

module.exports = { registerUser };