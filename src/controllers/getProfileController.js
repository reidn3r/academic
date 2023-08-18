const userModel = require('../model/User');
const companyModel = require('../model/Company');
const imageModel = require('../model/Image_Info');
const topicsModel = require('../model/Topics_Interest');
const contactModel = require('../model/Contact_type');
const sequelize = require('../config/sequelizeConfig');
const jwt = require('jsonwebtoken');

const getProfile = async(req, res) => {
    const { id } = req.params;
    let auth=false;
    if(req.cookies.loginToken){
        const token = req.cookies.loginToken;
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            auth = decoded.profile_id == id ? true : false;
        })
    }
    let foundUser = await userModel.findOne({where: {register_id: id}})|| await companyModel.findOne({where: {register_id: id}});
    if(!foundUser) return res.status(404).json({message: "User not found"});
    
    // return res.json({profile: foundUser});    
    const [foundProfile, profile_metadata] = await sequelize.query(`SELECT * FROM profile WHERE register_id=${foundUser.register_id} LIMIT 1`);
    if(foundProfile.length == 0) return res.status(404).json({message: "Profile not found"});
    
    const [profileTopics, topics_metadata] = await sequelize.query(`SELECT topic_id FROM topics_of_interest_profile WHERE profile_id=${foundProfile[0].id} `);
        //retorna array de inteiros, onde cada inteiro é o id de um topico

    let topics = [];
    if(profileTopics.length > 0){
        profileTopics.forEach(async(topic_id) => {
            const foundTopic = await topicsModel.findOne({ where: {id: topic_id.topic_id}});
            topics.push(foundTopic.topic);
        })
    }

    let contacts_array = [];
    const [profileContacts, contact_metadata] = await sequelize.query(`SELECT contact_content, contact_type_id FROM profile_contacts WHERE profile_id=${foundProfile[0].id}`);
    if(profileContacts.length > 0){
        profileContacts.forEach(async(contact) => {
            let typeContact = await contactModel.findOne({ where: {id: contact.contact_type_id}});

            let content = contact.contact_content;
            let typeContactName = typeContact.type; 
            contacts_array.push({ content, typeContactName });
        })
    }
    
    const foundImage = await imageModel.findByPk(foundProfile[0].image_id);
    const profileName = foundProfile[0].name;
    const profileEmail = foundProfile[0].contact_email;
    const profileDesc = foundProfile[0].description;
    const profileImage = foundImage.image_data;
    const mimeType = foundImage.image_content_type;
    
    console.log(contacts_array);
    const context = { profileName, profileEmail, profileDesc, profileImage, mimeType, topics, contacts_array, auth };

    // return res.json({profile: context});
    return res.render('profile', {context});
}

module.exports = getProfile;