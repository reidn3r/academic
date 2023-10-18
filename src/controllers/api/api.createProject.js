const sequelize = require('../../config/sequelizeConfig');
const ProjectImageData = require('../../model/Profile_Project_Image_Data');
const ProjectData = require('../../model/Profile_Project_Data');
const dateFormat = require('../../public/utils/dateFormat');

const createProject = async(req ,res, next) => {
        /* 
            body: descrição do projeto
            req.files: imagens do projeto 
            session: project_id
        */
    
    const { projectDesc } = req.body;
    const register_id = req.session.profileId;
    console.log(`register id:${register_id}`);
    
    const [profileId, metadata] = await sequelize.query(`SELECT id FROM profile WHERE register_id=${register_id}`);
    console.log(`register id:${profileId[0].id}`);
        
    let newProject = await ProjectData.create({
        profile_id: profileId[0].id,
        project_description: projectDesc,
    })
    
    if(req.files){
        let filename = null; blob = null; fileMimeType = null;
        req.files.forEach(async(img) => {
            filename = img.originalName;
            fileMimeType = img.mimetype;
            blob = img.buffer;

            await ProjectImageData.create({
                project_id: newProject.id,
                image_data: blob,
                image_content_type: fileMimeType,
                created_at: dateFormat(new Date())
            })
        })
    }

    return res.redirect(`/v1/profile/${profileId[0].id}/projects`);
}

module.exports = createProject;