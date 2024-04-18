const ProfileContacts = require('../../../models/Profile_Contacts');
const UserGrade = require('../../../models/User_Grade');
const UserPosGrade = require("../../../models/User_Pos_Grade");
const sequelize = require('../../config/sequelizeConfig');

const profileData = async(req, res) => {
    const { userEmail, userWhatsApp, userInstagram, userPosGrad } = req.body;
    if(!userEmail) return res.json({message: "Campo faltante: email"});

    const [ profileData, profileDataMetadata ] = await sequelize.query(`SELECT id, register_id FROM profile WHERE contact_email="${userEmail}"`);

    await ProfileContacts.create({
        profile_id: profileData[0].id,
        contact_type_id: 1,
        contact_content: userEmail
    })
    
    if(userWhatsApp){
        await ProfileContacts.create({
            profile_id: profileData[0].id,
            contact_type_id: 2,
            contact_content: userWhatsApp
        })
    }    
    if(userInstagram){
        await ProfileContacts.create({
            profile_id: profileData[0].id,
            contact_type_id: 3,
            contact_content: userInstagram
        })
    }
    const pos_grad_id = userPosGrad == "mestrado" ? 1 : userPosGrad == "doutorado" ? 2 : userPosGrad == "profissional" ? 3 : userPosGrad == "pos-doutorado" ? 4 : null;

    const [user_id, metadata] = await sequelize.query(`SELECT id FROM user WHERE email="${userEmail}"`); 
    if(userPosGrad){
        await UserPosGrade.create({
            profile_id: profileData[0].id,
            pos_grad_id: pos_grad_id 
        })
        
        await UserGrade.create({
            user_grade_id: 2,
            user_id: user_id[0].id,
            profile_id: profileData[0].id
        })        
    }
    else{
        await UserGrade.create({
            user_grade_id: 1,
            user_id: user_id[0].id, 
            profile_id: profileData[0].id
        })
    }
    
    return res.redirect(`/v1/login`);
}


module.exports = profileData;