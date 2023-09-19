const ProfileImageInfo = require('../../model/Profile_Image_Info');
const ProfileModel = require('../../model/Profile');
const query = require('../../public/utils/query');
const sequelize = require('../../config/sequelizeConfig');

const search = async(req, res) => {
    const { name, user_course, user_grade_id, university_id, city_id, state_id, page } = req.query;
    
    let queryData = {};
    if(name) queryData["name"] = name;
    if(user_course) queryData["user_course"] = user_course;
    if(user_grade_id) queryData["user_grade_id"] = Number(user_grade_id);
    if(university_id) queryData["university_id"] = Number(university_id);
    if(city_id) queryData["city_id"] = Number(city_id);
    if(state_id) queryData["state_id"] = Number(state_id);

    /* 
    1. queryProfile contém o register_id de
    todos os perfis que casam com a busca
    */
    let query_str = query(queryData);
    const [ queryProfile, metadata ] = await sequelize.query(`${query_str}`);

    let profileData = [];
    /* 
    2. profileData é um array de objetos contendo
    dados dos perfis encontrados:

    profileData = [
        {"name":"name_1","description":"lorem","image_id":x},{"name":"name_2","description":"ipsum","image_id":y}
        ]
        
        Podem existir registros (register_id) na tabela user que não
        criaram perfil (ou seja, não possuem register_id na tabela profile)
    */

        
        for( id of queryProfile ){
            const foundProfile = await ProfileModel.findOne({
                attributes: ['name', 'description', 'image_id'],
                where: { register_id: id.register_id },
            })
            if(foundProfile){
                const profile_image = await ProfileImageInfo.findOne({where:{id: foundProfile.image_id}});
    
                const profile = {
                    register_id: id.register_id,
                    name: foundProfile.name,
                    description: foundProfile.description,
                    image_data: profile_image.image_data,
                    image_mimetype: profile_image.image_content_type
                }
                profileData.push(profile);
            }
    }

    let start_idx = 1;
    let end_idx = 10;
    if(page && Math.abs(page) > 1){
        start_idx = process.env.PAGE_ELEMENTS * page;
        end_idx = Number(start_idx) + Number(process.env.PAGE_ELEMENTS) > profileData.length ? Number(profileData.length) - 1 : Number(start_idx) + Number(process.env.PAGE_ELEMENTS);
    }
    
    let render = [];
    for(start_idx; start_idx <= end_idx; start_idx++){
        render.push(profileData[start_idx]);
    }

    
    // return res.render('searchResults', {profileData});
    return res.render('searchResults', {render});
}


module.exports = search;