const sequelize = require('../../config/sequelizeConfig');

const editProjectContoller = async(req, res) => {
    const { id, project_id } = req.params;

    const [ Project, ProjectMetadata ] = await sequelize.query(`SELECT project_description FROM profile_project_data WHERE id=${project_id}`);
    if(Project.length == 0) return res.status(404).json({message: "Project not found"});
    
    let data = [];
    for(const project of Project){
        let image_data = [];
        let image_mimetype = [];
        let image_id = [];
        
        const images = await sequelize.query(`SELECT id, image_data, image_content_type FROM profile_project_image_data WHERE project_id=${project_id}`);
        
        images[0].forEach((img) => {
            image_data.push(img.image_data);
            image_mimetype.push(img.image_content_type);
            image_id.push(img.id);
        })
        
        let project_data = {
            project_id: project.id,
            project_description: project.project_description,
            image_id: image_id,
            image_data: image_data,
            image_mimetype: image_mimetype
        }
        data.push(project_data);
    }

    /*
    1. data é um array de objetos da seguinte forma:
    data:   [
        {
            project_id: int,
            project_desc: "..." - string de descrição do projeto
            image_id: int,
            image_data: [ '...' ] - binário da imagem
            image_mimetype: ['...'] - mimetype da imagem
            
        },
        { ... }, { ... }
    ]
    */
    
    const context = { data, id };
    return res.render('editProject', {context})
};

module.exports = editProjectContoller;