const UnivModel = require('../../model/University');
const StateModel = require('../../model/State_Info');
const CityModel = require('../../model/City_Info');
const ProfileImageModel = require('../../model/Profile_Image_Info');
const sequelize = require('../../config/sequelizeConfig');

const editProfile = async(req, res) => {
    const { description, university_name, course_name, state_name, city_name, register_id } = req.body;

    const university = await UnivModel.findOne({where: {university_name: university_name}});
    const state = await StateModel.findOne({where: {state_name: state_name}});
    const city = await CityModel.findOne({where: {city_name: city_name}});
    
    await sequelize.query(`UPDATE profile SET description="${description}" WHERE register_id=${register_id}`);
    
    await sequelize.query(`UPDATE user SET user_course="${course_name}", university_id=${university.id}, state_id=${state.id}, city_id=${city.id}  WHERE register_id=${register_id}`);
    
    if(req.files.length > 0){
        const [profileId, profileIdMetadata] = await sequelize.query(`SELECT id FROM profile WHERE register_id=${register_id}`);

        await ProfileImageModel.update({image_data:req.files[0].buffer, image_content_type:req.files[0].mimetype}, {where: {profile_id: profileId[0].id}});
    }
    return res.json({message: "ok"});
}

module.exports = editProfile;