const sequelize = require('../../config/sequelizeConfig');
const projectImageDataModel = require('../../model/Profile_Project_Image_Data');
const projectDataModel = require('../../model/Profile_Project_Data');

const editProject = async(req, res) => {
    /* 
        1. receber o array contendo o id das imagens alteradas
            1.1: Se o array tem tamanho maior que 0,
            alterar no bd as novas imagens
    
        2. receber o array contendo o id das imagens removidas
            2.1: Se o array tem tamanho maior que 0,
            remover no bd as imagens
    
        3. Receber o texto e alterar se houver alteração.
    */
    const changed_ids = JSON.parse(req.body.changed_ids).sort();
    const removed_ids = JSON.parse(req.body.removed_ids).sort();
    /* 
        1. Os indices são ordenados uma vez que em tela são renderizados por ordem de id e ao serem enviados,
        também são recebidos de forma ordenada
   */

    const project_id = JSON.parse(req.body.project_id);
    const project_description = req.body.project_description;

    for(id of removed_ids){
        try{
            await sequelize.query(`DELETE FROM profile_project_image_data WHERE id=${id}`);            
        }
        catch(err){
            res.json({error: err});
        }
    }
    
    for(let i=0; i<changed_ids.length; i++){
        let blob = req.files[i].buffer;
        let mimetype = req.files[i].mimetype;

        await projectImageDataModel.update({image_data: blob, image_content_type:mimetype}, {where: {id: changed_ids[i]}});
    }

    await projectDataModel.update({project_description:project_description }, {where: {id: project_id}})
    
    return res.json({message: "ok"});
}

module.exports = editProject;