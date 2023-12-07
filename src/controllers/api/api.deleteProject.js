const sequelize = require('../../config/sequelizeConfig');

const removeProject = async(req, res) => {
    const { projectId } = req.body;

    try{
        await Promise.all([
            sequelize.query(`DELETE FROM profile_project_image_data WHERE project_id=${projectId}`),
            
            sequelize.query(`DELETE FROM profile_project_data WHERE id=${projectId}`)
        ]);
        return res.status(200).json({message: "Project removed"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }
}

module.exports = removeProject;