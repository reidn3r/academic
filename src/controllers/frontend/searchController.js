const ProfileImageInfo = require('../../model/Profile_Image_Info');
const ProfileModel = require('../../model/Profile');
const { query, countQuery } = require('../../public/utils/sqlQuery');
const sequelize = require('../../config/sequelizeConfig');

const search = async(req, res) => {
    const { name, user_course, user_grade_id, university_id, city_id, state_id, page, interest } = req.query;
    const io = req.app.get('socketio');

    let queryData = {};
    if(name) queryData["name"] = name;
    if(interest) queryData["interest"] = String(interest);
    if(user_course) queryData["user_course"] = user_course;
    if(user_grade_id) queryData["user_grade_id"] = Number(user_grade_id);
    if(university_id) queryData["university_id"] = Number(university_id);
    if(city_id) queryData["city_id"] = Number(city_id);
    if(state_id) queryData["state_id"] = Number(state_id);
    if(Object.keys(queryData).length == 0) return res.redirect('/v1');
    delete queryData.interest;

    /* 
        1. Caso haja preenchimento do campo de interesse,
        a busca deve ser feita de forma separada.
    */
    
    let interestQuery;
    if(interest){
        /*
            2. Busca o id dos perfis relacionados ao
            tema de interesse de input
        */
        base_interest_str = `SELECT profile_id FROM topics_of_interest_profile AS tp INNER JOIN topics_of_interest AS ti ON ti.topic="${interest}" AND ti.id=tp.topic_id INNER JOIN profile AS p ON p.id=tp.profile_id `;
        
        const [ interestQueryResult, interestQueryResultMetadata ] = await sequelize.query(base_interest_str);
        interestQuery=interestQueryResult;
    }
    
    let query_str = query(queryData);
    if(interest){
        /* 
            3. Tratamento da string de busca no bd
            caso o campo de interesse seja preenchido
            com algum tema
        */
        query_str += Object.keys(queryData).length == 0 ? "(" : " AND (";
        for(let i=0; i<interestQuery.length; i++){
            query_str += `p.id=${interestQuery[i].profile_id} `;
            if(i != interestQuery.length-1){
                query_str += `OR `;
            }
        }
        query_str += `)`;
    }
    
    /* 
        4. LIMIT e OFFSET statement
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
        5. profileData é um set de objetos (posteriormente 
            transformado em array) contendo dados 
            dos perfis encontrados:

        profileData = [
            {"name":"name_1","description":"lorem","image_id":x},{"name":"name_2","description":"ipsum","image_id":y}
        ]
            
        Podem existir registros (register_id) na tabela user que não
        criaram perfil (ou seja, não possuem register_id na tabela profile)
    */

    for( id of queryProfile ){
        /* 
            6. queryProfile contém o register_id de
            todos os perfis que casam com a busca
        */
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
            profileData.add(profile);
        }
    }

    /*
        7. Transforma o Set de buscas
        em Array. 
    */
    const profileArray = Array.from(profileData);

    /* 
        8. Paginação
            - Indices das paginas são contados do idx. da pg. atual-2
            até o minimo entre pg.atual+2 e o maior idx. possível
    */

    let count_query_string = interest ? query_str.replace("SELECT * FROM", "SELECT COUNT(*) AS c FROM") : countQuery(queryData);
    const count_data = await sequelize.query(count_query_string);
    let profile_qty = count_data[0][0].c;
    
    let current_page = page ? Math.abs(page) : 1; pages_idx = [];
    let max_idx = 0;

    if(current_page>2){
        max_idx = current_page + 3 > Math.floor(profile_qty/Number(process.env.PAGE_ELEMENTS))+2 ? Math.floor(profile_qty/Number(process.env.PAGE_ELEMENTS))+2 : current_page+3;
        for(let i=current_page-2; i<max_idx; i++){
            pages_idx.push(i);
        }
    }
    else{
        max_idx = current_page + 5 > Math.floor(profile_qty/Number(process.env.PAGE_ELEMENTS))+2 ? Math.floor(profile_qty/Number(process.env.PAGE_ELEMENTS))+2 : current_page+5;
        for(let i=1; i< max_idx; i++){
            pages_idx.push(i);
        }
    }

    /* ---------- socket.io */
    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('disconnected');
        })

        socket.on('render_data', async(data) => {
            let id = res.locals.userRegisterId;
            const [messages, messagesMetadata] = await sequelize.query(`SELECT from_message_id, to_message_id, to_message_username, message, message_time FROM messages WHERE (to_message_id=${data.to_id} OR to_message_id=${id} )AND (from_message_id=${id} OR from_message_id=${data.to_id})`);

            io.emit('message_content_loaded', {content: messages});
            })
    })
        
    let userId = res.locals.userRegisterId;
    context = { profileArray, pages_idx, current_page, userId };
    return res.render('searchResults', {context});
}

module.exports = search;