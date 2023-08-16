const userModel = require('../model/User');
const companyModel = require('../model/Company');
const imageModel = require('../model/Image_Info');
const sequelize = require('../config/sequelizeConfig');

const getProfile = async(req, res) => {
    const { id } = req.params;

    let foundUser = await userModel.findOne({where: {register_id: id}})|| await companyModel.findOne({where: {register_id: id}});
    if(!foundUser) return res.status(404).json({message: "User not found"});
    
    // return res.json({profile: foundUser});
    
    const [foundProfile, metadata] = await sequelize.query(`SELECT * FROM profile WHERE register_id=${foundUser.register_id} LIMIT 1`);
    if(foundProfile.length == 0) return res.status(404).json({message: "Profile not found"});
    
    const foundImage = await imageModel.findByPk(foundProfile[0].image_id);
    
    const profileName = foundProfile[0].name;
    const profileEmail = foundProfile[0].contact_email;
    const profileDesc = foundProfile[0].description;
    const profileImage = foundImage.image_data;

    const context = { profileName, profileEmail, profileDesc, profileImage };
    // return res.json({profile: context});
    return res.render('profile', {context});
}

module.exports = getProfile;