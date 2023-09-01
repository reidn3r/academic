const sequelize = require('../../config/sequelizeConfig');

const editProjectContoller = (req, res) => {
    const { id, project_id } = req.params;
    return res.redirect('/v1');

}

module.exports = editProjectContoller;