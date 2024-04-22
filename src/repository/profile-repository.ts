// import { Profile } from "../models/Profile";
import { prisma } from '../db/prisma';
import jwt, { Secret } from 'jsonwebtoken';

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
                ProfileProjectData: {
                    select:{
                        project_description: true,
                        ProfileProjectImageData:true
                    }
                },
                user: {
                    select: {
                        university: true
                    }
                }
            }
        })
        
    }


    async getProfileIdByLoginToken(req:any, res:any):Promise<number | null>{
        const token = req.cookies.loginToken;
        if(!token) return res.redirect('/v1/login');
        
        let profileId:number|null = null;
        const secret:Secret = process.env.JWT_SECRET as Secret;
        
        jwt.verify(token, secret, (err:any, decoded:any) => {
            if(!decoded){
                return res.redirect('/v1/logout');
            }
            profileId = decoded.profile_id;
        })

        return profileId;  
    }

    async getProfileProjectsById(id:number){
        return await prisma.profile.findUnique({
            where: { id },
            select: {
                user:{
                    select:{
                        name: true
                    }
                },
                ProfileProjectData: {
                    select: {
                        id:true,
                        project_description: true,
                        ProfileProjectImageData: {
                            select: {
                                image_content_type: true,
                                image_data: true,
                                createdAt: true,
                            }
                        }
                    }
                },
            }
        })
    }
}