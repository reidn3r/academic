const ProfileContacts = require('../../model/Profile_Contacts');
const UserGrade = require('../../model/User_Grade');
const UserPosGrade = require("../../model/User_Pos_Grade");
const sequelize = require('../../config/sequelizeConfig');

const profileData = async(req, res) => {
    const { userEmail, userWhatsApp, userInstagram, userPosGrad } = req.body;
    
    // if(!userEmail) return res.json({message: "Campo faltante: email"});
    
    const profileId = req.session.profileId;
    if(!profileId) return res.json({message: profileId});
    await ProfileContacts.create({
        profile_id: profileId,
        contact_type_id: 1,
        contact_content: userEmail
    })
    
    if(userWhatsApp){
        await ProfileContacts.create({
            profile_id: profileId,
            contact_type_id: 2,
            contact_content: userWhatsApp
        })
    }    
    if(userInstagram){
        await ProfileContacts.create({
            profile_id: profileId,
            contact_type_id: 3,
            contact_content: userInstagram
        })
    }
    const pos_grad_id = userPosGrad == "mestrado" ? 1 : userPosGrad == "doutorado" ? 2 : userPosGrad == "profissional" ? 3 : userPosGrad == "pos-doutorado" ? 4 : null;

    const [user_id, metadata] = await sequelize.query(`SELECT id FROM user WHERE email="${userEmail}"`); 
    if(userPosGrad){
        await UserPosGrade.create({
            profile_id: profileId,
            pos_grad_id: pos_grad_id 
        })
        
        await UserGrade.create({
            user_grade_id: 2,
            user_id: user_id[0].id,
            profile_id: profileId
        })        
    }
    else{
        await UserGrade.create({
            user_grade_id: 1,
            user_id: user_id[0].id, 
            profile_id: profileId
        })
    }

    return res.redirect(`/v1/profile/${profileId}`);
}


module.exports = profileData;