import { Session } from "../models/Session";
import { prisma } from "../db/prisma";

export class SessionRepository{

    public async createNewSession(profile_id:number): Promise<Session | null>{
        return await prisma.session.create({
            data: {
                profileId: profile_id
            }
        })
    }

    public async setLogoutDate(session_id:number):Promise<void>{
        await prisma.session.update({
            where:{
                id: session_id
            },
            data:{
                logout_date: new Date()
            }
        });
    }
}