const universityModel = require('../../models/University');

const findUniversityByName = async(universityInput) => {
    const foundUniversity = await universityModel.findOne({where: {university_name: universityInput}});
    return foundUniversity;
}

module.exports = findUniversityByName;