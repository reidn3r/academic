const userModel = require('../../model/User');
const imageModel = require('../../model/Profile_Image_Info');
const sequelize = require('../../config/sequelizeConfig');
const jwt = require('jsonwebtoken');

//Buscar dados dos projetos
const getProfile = async(req, res) => {
    const { id } = req.params;
    
    let foundUser = await userModel.findOne({where: {register_id: id}})
    if(!foundUser) return res.status(404).json({message: "User not found"});
    
    const [foundProfile, profile_metadata] = await sequelize.query(`SELECT * FROM profile WHERE register_id=${foundUser.register_id} LIMIT 1`);
    if(foundProfile.length == 0) return res.status(404).json({message: "Profile not found"});
    
    const [foundProjects, foundProjectsMetadata] = await sequelize.query(`SELECT * FROM profile_project_data WHERE profile_id=${foundProfile[0].id}`);

    let data = [];
    for(const project of foundProjects){
        let image_data = [];
        let image_mimetype = [];
        
        const images = await sequelize.query(`SELECT image_data, image_content_type FROM profile_project_image_data WHERE project_id=${project.id}`);
        
        images[0].forEach((img) => {
            image_data.push(img.image_data);
            image_mimetype.push(img.image_content_type);
        })

        let project_data = {
            project_id: project.id,
            project_description: project.project_description,
            image_data: image_data,
            image_mimetype: image_mimetype
            }
            data.push(project_data);
    }

    // return res.json({message: data});
    const foundImage = await imageModel.findByPk(foundProfile[0].image_id);
    const profileName = foundProfile[0].name;
    const profileEmail = foundProfile[0].contact_email;
    const profileDesc = foundProfile[0].description;
    const profileImage = foundImage.image_data;
    const mimeType = foundImage.image_content_type;
    const auth = req.auth;
    
    const context = { profileName, profileEmail, profileDesc, profileImage, mimeType, auth, data, id };
    return res.render('profile', {context});
}

module.exports = getProfile;