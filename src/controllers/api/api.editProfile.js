const UnivModel = require('../../model/University');
const StateModel = require('../../model/State_Info');
const CityModel = require('../../model/City_Info');
const ProfileImageModel = require('../../model/Profile_Image_Info');
const TopicsOfInterest = require('../../model/Topics_Interest');
const TopicsOfInterestProfile = require('../../model/Topics_of_Interest_Profile');
const sequelize = require('../../config/sequelizeConfig');

const editProfile = async(req, res) => {
    
    const { description, university_name, course_name, state_name, city_name, topics_JSON, register_id } = req.body;

    const [profileId, profileIdMetadata] = await sequelize.query(`SELECT id FROM profile WHERE register_id=${register_id};`);

    const topics = JSON.parse(topics_JSON);
    for(t of topics){
    /*
        1. Se current diferente de post:
            - Houve mudança no interesse.
                - Verificar se é vazio:
                    - Verificar se mais de um usuário (profile_id) tem interesse no mesmo tópico (current -> topic_id)
                        - Se houver apenas um usuário, deletar o interesse de topics_of_interest (por id) e desvincular o profile_id de topic_id em topics_of_interest_profile
                        - C.C, apenas desvincular o profile_id de topic_id em topics_of_interest_profile

                - Se não for vazio:
                    - findOrCreate em t.post
                    - se encontrado, desvincula o usuário de t.current
                    e associa a t.post (alter table? altera os ids apenas?)
                    - se não encontrado, cria em topics_of_interest e 
                    associa o usuário ao novo interesse criado em topics_of_interest_profile
                
        2. Se current != post e current era vazio: novo tópico inserido.
            - Verificar se o tópico ja existe
                - Se existe, associar o usuário ao tópico encontrado
                - Se não, criar o tópico e associar ao usuário
        3. Se current = post, nada mudou.
    */
        const foundTopic = await TopicsOfInterest.findOne({where: {topic: t.current}});

        if(t.current != t.post && t.current !== ""){
            /* O interesse foi apagado */
            if(t.post === ""){
                const { count, rows } = await TopicsOfInterestProfile.findAndCountAll({where:{topic_id:foundTopic.id}})
                if(count == 1){
                    await TopicsOfInterestProfile.destroy({
                        where:{topic_id: foundTopic.id}
                    });
                    
                    await TopicsOfInterest.destroy({
                        where:{id: foundTopic.id}
                    })
                }
                else{
                    await TopicsOfInterestProfile.destroy({
                        where:{ profile_id: profileId[0].id }
                    })
                }
            }
            else{
                /* O interesse não foi apagado */
                const [data, createdData] = await TopicsOfInterest.findOrCreate({
                    where: { topic: t.post },
                    defaults: { topic:t.post }
                })

                /* Novo tópico não existe no BD. ainda */
                if(createdData){
                    await TopicsOfInterestProfile.update({
                        topic_id: data.id
                    },{
                        where: {
                            profile_id: profileId[0].id,
                            topic_id: foundTopic.id
                        }
                    })
                    
                    const { count, rows } = await TopicsOfInterest.findAndCountAll({where:{topic:t.current}})
                    
                    if(count==1) await TopicsOfInterest.destroy({ where: {id: foundTopic.id} });
                    
                /* Novo tópico já existe no BD */
                }else{
                    const currentData = await TopicsOfInterest.findOne({ where: {topic: t.post }});
                    await TopicsOfInterestProfile.update({
                        topic_id: currentData.id
                    },{
                        where: {
                            profile_id: profileId[0].id,
                            topic_id: foundTopic.id
                        }
                    })
                    const { count, rows } = await TopicsOfInterest.findAndCountAll({where:{topic:t.current}})
                    if(count == 1) await TopicsOfInterest.destroy({ where:{topic: t.current} });
                }
            }
        }
        /* Novo Tópico Inserido */
        else if(t.current != t.post && t.current == ""){
            if(foundTopic){
                await TopicsOfInterestProfile.create({
                    topic_id: foundTopic.id,
                    profile_id:profileId[0].id
                })
            }
            else{
                const newTopic = await TopicsOfInterest.create({
                    topic: t.post
                })
                await TopicsOfInterestProfile.create({
                    topic_id: newTopic.id,
                    profile_id:profileId[0].id
                })
            }

        }
    }

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