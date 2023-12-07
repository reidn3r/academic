const ProfileImageInfo = require('../../model/Profile_Image_Info');
const ProfileModel = require('../../model/Profile');
const UserModel = require('../../model/User');

const MessagesModel = require('../../model/MessagesModel');
const { query, countQuery } = require('../../public/utils/sqlQuery');
const sequelize = require('../../config/sequelizeConfig');
const { Op } = require('sequelize')

const search = async(req, res) => {
    const { name, user_course, user_grade_id, university_id, city_id, state_id, page, interest } = req.query;
    const userId = res.locals.userRegisterId;

    let queryData = {};
    if(name) queryData["name"] = name;
    if(interest) queryData["interest"] = String(interest);
    if(user_course) queryData["user_course"] = user_course;
    if(user_grade_id) queryData["user_grade_id"] = Number(user_grade_id);
    if(university_id) queryData["university_id"] = Number(university_id);
    if(city_id) queryData["city_id"] = Number(city_id);
    if(state_id) queryData["state_id"] = Number(state_id);
    if(Object.keys(queryData).length == 0) return res.redirect('/v1');
    /* 
        1. Caso haja preenchimento do campo de interesse,
        a busca deve ser feita de forma separada.
    */

    let query_str = query(queryData);

    /* 
        2. LIMIT e OFFSET statement
        para tratar a qtde. de dados buscados e os dados
        referentes a paginação (offset)
    */
    if(page && Math.abs(page) > 1){
        query_str += ` LIMIT ${process.env.PAGE_ELEMENTS} OFFSET ${process.env.PAGE_ELEMENTS * (Math.abs(page) - 1)}`;
    }
    else{
        query_str += ` LIMIT ${process.env.PAGE_ELEMENTS}`;
    }
    const [ queryProfile, metadata ] = await sequelize.query(`${query_str}`);
    
    let profileData = new Set();
    /* 
        3. profileData é um set de objetos (posteriormente 
            transformado em array) contendo dados 
            dos perfis encontrados:

        profileData = [
            {"name":"name_1","description":"lorem","image_id":x},
            {"name":"name_2","description":"ipsum","image_id":y}
        ]
            
        Podem existir registros (register_id) na tabela user que não
        criaram perfil (ou seja, não possuem register_id
        na tabela profile)
    */
    
    for( id of queryProfile ){        
        /* 
        4. queryProfile contém o register_id de
        todos os perfis que casam com a busca
        */
        const foundProfile = await ProfileModel.findOne({
            attributes: ['name', 'description', 'image_id'],
            where: { register_id: id.register_id || id.profile_id },
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
            profileData.add(profile);
        }
    }

    /*
        5. Transforma o Set de buscas
        em Array. 
    */
    const profileArray = Array.from(profileData);

    /* 
        6. Paginação
            - Indices das paginas são contados do idx. da pg. atual-2
            até o minimo entre pg.atual+2 e o maior idx. possível
    */
    const count_query_string = countQuery(query_str);

    const [ countData, countDataMetada ] = await sequelize.query(count_query_string);
    let profile_qty = countData[0].c;    

    let current_page = page ? Math.abs(page) : 1; let pages_idx = [];

    const page_elements = Number(process.env.PAGE_ELEMENTS);
    const ratio = Math.floor(profile_qty/page_elements);

    let i = current_page-2 <= 0 ? 1 : current_page == ratio+1 ? current_page-4: current_page+2> ratio + 1 ? current_page - 3: current_page-2;
    
    let j = current_page+2 > ratio ? ratio + 1 : i == 1 ? 5 : current_page+2;

    while(i <= j){
        pages_idx.push(i);
        i++;
    }
        
    const foundUser = await UserModel.findOne({attributes: ['name'], 
    where: {register_id:userId}});
    
    const UserName = foundUser.name;
    
    const foundMessagesUser = await MessagesModel.findAll({
        attributes: ['from_message_username', 'to_message_username', 'to_message_id', 'from_message_id'],
        where: {[Op.or]: [{from_message_id: userId},{ to_message_id: userId}]},
        group: ["from_message_username", "to_message_username", "to_message_id", "from_message_id"]
    });

    let messagesUser = [];
    for(user of foundMessagesUser){
        let data = {}
        data["message_username"] = user.to_message_id !== userId ? user.to_message_username : user.from_message_username;

        data["message_id"] = user.to_message_id !== userId ? user.to_message_id : user.from_message_id;

        let exists = messagesUser.some(u => {
            return u.message_id === data.message_id
        })

        if(!exists) messagesUser.push(data);
    }
    
    let context = { profileArray, pages_idx, current_page, userId, UserName, messagesUser };
    return res.render('searchResults', {context});
}


module.exports = search;