const sequelize = require('../../config/sequelizeConfig');

const removeProject = async(req, res) => {
    const { projectId } = req.body;
    const id = req.session.profileId;

    const [removeImage, removeImageMetadata] = await sequelize.query(`DELETE FROM profile_project_image_data WHERE project_id=${projectId}`);

    const [removeProjectData, removeProjectDataMetadata] = await sequelize.query(`DELETE FROM profile_project_data WHERE id=${projectId}`);

    return res.status(200).json({message: "Project removed"});
    // return res.redirect('/v1/');
}

module.exports = removeProject;