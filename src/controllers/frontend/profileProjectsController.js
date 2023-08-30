const sequelize = require('../../config/sequelizeConfig');

const profileProjects = async(req, res) => {
    const { id } = req.params;
    //register_id
    
    req.session.profileId = id;
    const [foundProfile, foundProfileMetadata] = await sequelize.query(`SELECT id, name FROM profile WHERE register_id=${id}`);

    if(foundProfile.length == 0) return res.status(404).json({message: "profile not found"});
    
    const [foundProjects, foundProjectsMetadata] = await sequelize.query(`SELECT * FROM profile_project_data WHERE profile_id=${foundProfile[0].id}`);

    const profileName = foundProfile[0].name;
    let data = [];

    if (foundProjects.length > 0) {
    for(const project of foundProjects){
        let image_data = [];
        let image_mimetype = [];

        const images = await sequelize.query(`SELECT * FROM profile_project_image_data WHERE project_id=${project.id}`);
        images.forEach((img) => {
            image_data.push(img[0].image_data);
            image_mimetype.push(img[0].image_content_type);
        })

        let project_data = {
            project_description: project.project_description,
            image_data: image_data,
            image_mimetype: image_mimetype
            }
            
            data.push(project_data);
        }
    }
    /*
        1. data é um array de objetos da seguinte forma:
        data:   [
                    {
                    project_desc: "..." - string de descrição do projeto
                    image_data: [ '...' ] - binário da imagem
                    image_mimetype: ['...'] - mimetype da imagem
                    }
                ]
   */
    const context = { profileName, data };
    return res.render('profileProjects', {context:context});

}

module.exports = profileProjects;