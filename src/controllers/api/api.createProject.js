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
    const profile_id = req.session.profileId;
    // const { profile_id } = req.params;

    let newProject = await ProjectData.create({
        profile_id: profile_id,
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

    return res.redirect(`/v1/profile/${profile_id}/projects`);
}

module.exports = createProject;