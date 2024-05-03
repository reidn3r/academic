import { prisma } from "../db/prisma";
import { Topic } from '../adapters/type-topic';

export class TopicsRepository {
    public async findAllTopics(){
        return await prisma.topicsInterest.findMany({
            select: { 
                id:false,
                topic: true
            }
        })
    }

    async findTopic(topic:string){
        return await prisma.topicsInterest.findUnique({
            where: {
                topic: topic
            },
            select:{
                id: true,
                TopicsOfInterestProfile: true
            }
        });
    }

    async countTopicAndProfileConnectionsById(id:number){
        return await prisma.topicsOfInterestProfile.count({
            where:{
                topicsInterestId: id
            }
        })
    }

    async deleteTopicById(id:number){
        return await prisma.topicsInterest.delete({
            where:{
                id: id
            }
        })
    }

    async deleteTopicByIdAndProfileId(topicId: number, profileId: number){
        return prisma.topicsOfInterestProfile.delete({
            where: {
                topicsInterestId_profileId: {
                    topicsInterestId: topicId,
                    profileId: profileId
                }
            }
        })
    }


    async createNewTopic(profileId:number, topic:Topic){
        const foundTopic = await this.findTopic(topic.post);

        if(foundTopic && profileId){
            return await prisma.topicsOfInterestProfile.create({
                data: {
                    profileId: profileId,
                    topicsInterestId: foundTopic.id
                }
            })
        }

        else if(profileId){
                return await prisma.topicsInterest.create({
                    data: {
                        topic: topic.post,
                        TopicsOfInterestProfile:{
                            create:{
                                profileId: profileId,
                            }
                        }
                    }
                })
            }
    }

    async disconnectUserToTopic(profileId:number, topic:Topic){
        const foundTopic = await this.findTopic(topic.current);

        if(foundTopic){
            //Desassocia usuário do tópico
            await prisma.topicsOfInterestProfile.delete({
                where:{
                    topicsInterestId_profileId: {
                        topicsInterestId: foundTopic.id,
                        profileId: profileId
                    }
                }
            })

            //Se nao há mais usuários com esse tópico, deleta
            if(foundTopic.TopicsOfInterestProfile.length === 1){
                await prisma.topicsInterest.delete({
                    where: {
                        id: foundTopic.id
                    }
                })
            }
        }
    }

    async editTopic(profileId:number, topic:Topic){
        const [newTopic, oldTopic] = await Promise.all([
            this.findTopic(topic.post),
            this.findTopic(topic.current),
        ])

        const [count, _] = await Promise.all([
            this.countTopicAndProfileConnectionsById(oldTopic!.id),
            this.deleteTopicByIdAndProfileId(oldTopic!.id, profileId)
        ])

        //Deleta tópico
        if(count <= 1) await this.deleteTopicById(oldTopic!.id);

        if(!newTopic && profileId){
            await prisma.topicsInterest.create({
                data:{ 
                    topic: topic.post,
                    TopicsOfInterestProfile:{
                        create:{
                            profileId: profileId
                        }
                    }
                }
            })
        }
        else{
            await prisma.topicsOfInterestProfile.create({
                data: {
                    profileId: profileId,
                    topicsInterestId: newTopic!.id
                }
            })
        }
    }
}