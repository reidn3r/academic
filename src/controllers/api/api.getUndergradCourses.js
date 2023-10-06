const sequelize = require('../../config/sequelizeConfig');

const getCourses = async(req, res) => {
    const { universityName } = req.body;

    const [result, metadata] = await sequelize.query(`SELECT course_name FROM undergraduate_courses AS ucs INNER JOIN university AS u ON u.university_name="${universityName}" AND ucs.university_name="${universityName}" ORDER BY course_name ASC`);
    
    return res.status(200).json({courses: result});
}

module.exports = getCourses;