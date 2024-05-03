import { ProfileRepository } from "../../repository/profile-repository";
import { Topic } from "../../adapters/type-topic";
import { TopicsRepository } from "../../repository/topics-repository";

export const EditProfile = async(req:any, res:any) => {
    
    const { description, university_name, course_name, state_name, city_name, topics_string } = req.body;

    if(!course_name || !city_name) return res.status(400).json({"message": "Missing course name"});    
    const topics = JSON.parse(req.body.topics_string);
    const profileRepository = new ProfileRepository();
    const profileId = await profileRepository.getProfileIdByLoginToken(req, res);

    const topicRepository = new TopicsRepository();
    try{
        topics.map(async(topic:Topic) => {
            if(topic.current != topic.post){
                if(topic.current == "" && topic.post != "" && profileId){
                    //Topico era vazio e foi preenchido
                    await topicRepository.createNewTopic(profileId, topic);
                }

                else if(topic.post === "" && topic.current !== "" && profileId){
                    //Tinha conteúdo e foi apagado
                    await topicRepository.disconnectUserToTopic(profileId, topic);
                }
                else if(profileId){
                    //Tópico foi editado
                    await topicRepository.editTopic(profileId, topic);
                }
            }
    
           //Testar e atualizar o restante
        })

    }
    catch(err){
        console.log(err);
    }
    
    //Atualizar restante dos dados
    return res.json({ message: "ok" });
}
