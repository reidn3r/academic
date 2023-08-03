const userModel = require('../model/User');
const registerModel = require('../model/Register');


const registerUser = async(universityId, userActivityId, nameInput, emailInput, hashPw, cityId, stateId, cpfInput, createdDate, birthInput) => {
    const newRegister = await registerModel.create({ id_register_type: 1 });
    const newUser = await userModel.create({
        register_id: newRegister.id,
        university_id: universityId,
        user_activity_id: userActivityId,
        name: nameInput,
        email: emailInput,
        password: hashPw,
        city_id: cityId,
        state_id: stateId,
        cpf: cpfInput,
        created_at: createdDate,
        birthday: birthInput
    });
    return newUser;
}

module.exports = registerUser;