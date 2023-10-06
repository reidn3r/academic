const sequelize = require('../../config/sequelizeConfig');

const getCity = async(req, res) => {
    const stateName = req.body;    
    let Cities = await sequelize.query(`SELECT city_name FROM city_info AS ct INNER JOIN state_info AS st WHERE ct.state_id=st.id AND state_name="${stateName.stateName}"`, { type: sequelize.QueryTypes.SELECT });    
    return res.status(200).json({Cities: Cities});
}

module.exports = getCity;