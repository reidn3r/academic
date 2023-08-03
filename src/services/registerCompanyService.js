const companyModel = require('../model/Company');
const registerModel = require('../model/Register');
const dateFormat = require('../public/utils/dateFormat');

const registerCompany = async(nameInput, emailInput, hashPw, cityId, stateId, cnpjInput) => {
    const newRegister = await registerModel.create({ id_register_type: 2 });
    const newCompany = await companyModel.create({
        register_id: newRegister.id,
        name: nameInput,
        email: emailInput,
        password: hashPw,
        city_id: cityId,
        state_id: stateId,
        cnpj: cnpjInput,
        created_at: dateFormat(new Date()),
    });
    return newCompany;
}

module.exports = registerCompany;