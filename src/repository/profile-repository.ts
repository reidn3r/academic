// import { Profile } from "../models/Profile";
import { prisma } from '../db/prisma';

export class ProfileRepository{

    public async findProfileByEmail(email:string){
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                Profile: true,
            },
        });
    }


    public async createProfileWithImage(description:string, file_mimetype:string, binary_data:Buffer, profile_id:number):Promise<void>{        
        await prisma.profile.create({
            data:{
                description: description,
                ProfileImageInfo: {
                    create:{
                        image_content_type: file_mimetype,
                        image_data: binary_data,
                    }
                },
                user:{
                    connect:{
                        id: profile_id
                    }
                }
            }
        })
    }


    public async getProfileDataById(id:number){
        return await prisma.profile.findUnique({
            where:{
                id
            },
            include:{
                ProfileImageInfo: true,
                ProfileProjectData: true,
                user: {
                    select: {
                        university: true
                    }
                }
            }
        })
        
    }
}