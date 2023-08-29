const profileModel = require('../../model/Profile');
const sequelize = require('../../config/sequelizeConfig');

const profileProjects = async(req, res) => {
    const { id } = req.params;
        //register_id
    
    req.session.profileId = id;
    // const foundProfile = await profileModel.findOne({where: {register_id: id}});
    const [foundProfile, foundProfileMetadata] = await sequelize.query(`SELECT id, name FROM profile WHERE register_id=${id}`);

    if(foundProfile.length == 0) return res.status(404).json({message: "profile not found"});
    
    const [foundProjects, foundProjectsMetadata] = await sequelize.query(`SELECT * FROM profile_project_data WHERE profile_id=${foundProfile[0].id}`);

    const profileName = foundProfile[0].name;

    // [
    //   {
    //     project_desc: "..."
    //     image_data: [ '...' ]
    //     image_mimetype: ['...']
    //    }
    // ]

    const profileProjects = foundProjects;
        //É um array
    // profileProjects.forEach((pr) => {
    //     console.log(pr);
    // })

    let data = [];
    if(profileProjects.length > 0){
        profileProjects.forEach(async(project) => {
            let image_data = [], image_mimetype=[], project_desc; 
            
            project_description = project.project_description;
            
            /* 
            SELECT image_data, image_content_type FROM profile_project_image_data WHERE project_id=1;
            */
            let image = await sequelize.query(`SELECT * FROM profile_project_image_data WHERE project_id=${project.id}`);
                /*
                Retorna um array de objetos 
                contendo image_data
                e image_content_type
                */

                // console.log(`image data: ${image}`);
            image.forEach((img) => {
                console.log(img[0].image_data);
                console.log(img[0].image_content_type);
                image_data.push(img[0].image_data);
                image_mimetype.push(img[0].image_content_type);
            })

            let project_data = {
                project_description,
                image_data,
                image_mimetype
            };

            data.push(project_data);
        });
    }
    const context = { profileName, data };

    console.log(`context: ${context[0]}`);
    return res.render('profileProjects', {context:context});
}

module.exports = profileProjects;