const userModel = require('../model/User');
const companyModel = require('../model/Company');
const imageModel = require('../model/Image_Info');
const sequelize = require('../config/sequelizeConfig');
const jwt = require('jsonwebtoken');

const getProfile = async(req, res) => {
    const { id } = req.params;
    let auth=false;
    if(req.cookies.loginToken){
        const token = req.cookies.loginToken;
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            /* Corrigir query */
            const [results, metadata] = await sequelize.query(`SELECT * FROM profile WHERE register_id=${decoded.id} LIMIT 1`);
            if(results.length > 0){
                console.log("results>0")
                const foundData = await userModel.findOne({where: {id: decoded.id}}) || companyModel.findOne({where: {id: decoded.id}});
                if(foundData && results[0].contact_email == foundData.email){
                    auth = true;
                }
            }
        })
    }
    console.log(`auth: ${auth}`);
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
    const mimeType = foundImage.image_content_type;

    const context = { profileName, profileEmail, profileDesc, profileImage, mimeType, auth };

    // return res.json({profile: context});
    return res.render('profile', {context});
}

module.exports = getProfile;