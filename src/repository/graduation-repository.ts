import { prisma } from '../db/prisma';
import { GraduateInfo } from '../models/Graduation';

export class GraduationRepository {

    public async findAllGraduation():Promise<GraduateInfo[] | null>{
        return await prisma.graduateInfo.findMany({
            select:{
                grade: true,
            }
        })
    }

}