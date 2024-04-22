import { prisma } from '../db/prisma';

export class SearchService {

    public SearchForUsers = async(name:string|null, university:string|null, user_course:string|null, city:string|null, state:string|null, page:number|null) => {
        return await prisma.user.findMany({
            where:{
                AND: [
                    { 
                        name: name?name:{} 
                    },
                    { 
                        university: university?university:{} 
                    },
                    {
                        user_course:user_course?user_course:{}
                    },
                    {
                        city: city?city:{}
                    },
                    {
                        state: state?state : {}
                    },
    
                    // {
                    //     userActivity: gradInput ? gradInput : {}
                    // },
                ]
            },
            select:{
                name: true,
                university: true,
                Profile: {
                    select:{
                        description: true,
                        ProfileImageInfo:{
                            select:{
                                image_data: false,
                                image_content_type: true
                            }
                        },
                    }
                }
            },
            skip: (page && page != 1) ? page * 10 : 0,
            take: 10,
        });
    }

    public CountFoundUsers = async(name:string|null, university:string|null, user_course:string|null, city:string|null, state:string|null):Promise<number> => {
        return await prisma.user.count({
            where:{
                AND: [
                    { 
                        name: name?name:{} 
                    },
                    { 
                        university: university?university:{} 
                    },
                    {
                        user_course:user_course?user_course:{}
                    },
                    {
                        city: city?city:{}
                    },
                    {
                        state: state?state : {}
                    },
    
                ]
            },
        });
    }

}