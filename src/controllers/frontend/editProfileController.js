const StateModel = require('../../model/State_Info');
const UnivModel = require('../../model/University');
const UserModel = require('../../model/User');

const sequelize = require('../../config/sequelizeConfig');

const editProfile = async(req, res) => {
    const { id } = req.params;
    
    /* Dados do usuário */
    const UserData = await UserModel.findOne({where: {register_id:id}, attributes: ['university_id', 'city_id', 'state_id', 'user_course']});
    
    /* Universidade do usuário */
    const UserUniv= await UnivModel.findOne({where: {id: UserData.university_id}, attributes:['university_name']});

    /* Local de atuação do usuário */
    const [userLocation, userLocationMetadata] = await sequelize.query(`SELECT ci.city_name, si.state_name FROM city_info AS ci INNER JOIN state_info AS si ON ci.id=${UserData.city_id} AND si.id=${UserData.state_id}`);
    
    /* Dados do perfil (descrição, id da imagem de perfil) */
    const [userProfile, userProfileMetadata] = await sequelize.query(`SELECT id, description, image_id FROM profile WHERE register_id=${id}  `);
    
    /* Imagem de perfil (dado binários da imagem, extensão da imagem) */
    const [userImage, userImageMetadata] = await sequelize.query(`SELECT image_data, image_content_type FROM profile_image_info WHERE id=${userProfile[0].image_id}`)

    /* Topicos de interesse do usuário */
    const [interestTopics, interestTopicsMetadata] = await sequelize.query(`SELECT topic FROM topics_of_interest AS ti
	INNER JOIN topics_of_interest_profile AS tip
    ON tip.profile_id=${userProfile[0].id} AND tip.topic_id=ti.id`);

    /* Dados renderizados em tag select */
    const States = await StateModel.findAll({attributes: ['state_name']});
    const Universities = await UnivModel.findAll({attributes: ['university_name']});
    
    /* 
        Conteúdo de context:
            1. UserData: {university_id, city_id, state_id, user_course}
            2. UserUniv: {university_name}
            3. UserLocation: [{city_name, state_name}]
            4. profileDescription: string
            5. userImage:  [{image_data, image_content_type}]
            6. interestTopics: [string, string, string]
    */

    const profileDescription = userProfile[0].description;
    const context = { States, Universities, UserData, UserUniv, userLocation, profileDescription, userImage, interestTopics };
    return res.render('editProfile', {context});
}

module.exports = editProfile;