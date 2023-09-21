const ProfileImageInfo = require('../../model/Profile_Image_Info');
const ProfileModel = require('../../model/Profile');
const { query, countQuery } = require('../../public/utils/sqlQuery');
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
    if(page && Math.abs(page) > 1){
        query_str += ` LIMIT ${process.env.PAGE_ELEMENTS} OFFSET ${process.env.PAGE_ELEMENTS * (Math.abs(page) - 1)}`;
    }
    else{
        query_str += ` LIMIT ${process.env.PAGE_ELEMENTS}`;
    }
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

    /* 
        3. Paginação
            - Indices das paginas são contados do idx. da pg. atual-2
            até o minimo entre pg.atual+2 e o maior idx. possível
            - É
    */

    let count_query_string = countQuery(queryData);
    const count_data = await sequelize.query(`${count_query_string}`);
    let profile_qty = count_data[0][0].c;
    
    let current_page = page ? Math.abs(page) : 1; pages_idx = [];
    let max_idx = 0;

    if(current_page>2){
        max_idx = current_page + 3 > Math.floor(profile_qty/10)+2 ? Math.floor(profile_qty/10)+2 : current_page+3;
        for(let i=current_page-2; i<max_idx; i++){
            pages_idx.push(i);
        }
    }
    else{
        max_idx = current_page + 5 > Math.floor(profile_qty/10)+2 ? Math.floor(profile_qty/10)+2 : current_page+5;
        for(let i=1; i< max_idx; i++){
            pages_idx.push(i);
        }
    }

    context = { profileData, pages_idx };
    return res.render('searchResults', {context});
}

module.exports = search;