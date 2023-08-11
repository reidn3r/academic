const userModel = require('../model/User');
const companyModel = require('../model/Company');
const imageModel = require('../model/Image_Info');
const sequelize = require('../config/sequelizeConfig');

const getProfile = async(req, res) => {
    const { id } = req.params;

    let foundUser = await userModel.findOne({where: {id: id}})|| await companyModel.findOne({where: {id: id}});
    if(!foundUser) return res.status(404).json({message: "User not found"});
    
    const [foundProfile, metadata] = await sequelize.query(`SELECT * FROM profile WHERE contact_email="${foundUser.email}" LIMIT 1`);
    if(!foundProfile) return res.status(404).json({message: "Profile not found"});

    const foundImage = await imageModel.findByPk(foundProfile[0].image_id);

    const profileName = foundProfile[0].name;
    const profileEmail = foundProfile[0].contact_email;
    const profileDesc = foundProfile[0].description;
    const profileImage = foundImage.image_data;

    const context = { profileName, profileEmail, profileDesc, profileImage };
    res.json({profile: context});
}

module.exports = getProfile;