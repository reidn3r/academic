import { prisma } from "../db/prisma";

export class TopicsRepository {

    public async findAllTopics(){
        return await prisma.topicsInterest.findMany({
            select: { 
                id:false,
                topic: true
            }
        })
    }
}