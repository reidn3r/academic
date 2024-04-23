import { prisma } from "../../db/prisma";
import { EditProjectAdapter } from '../../adapters/edit-project-adapter';

export const EditProjects = async(req:any, res:any) => {
    const { profileId, projectId } = EditProjectAdapter.parse(req.params);
    
    /* 
        - Servir:
            1. id do projeto
            2. descricao
            3. imagens
    */

    const data = await prisma.profileProjectData.findMany({
        where: {
            id: projectId,
            profileId: profileId
        },
        select:{
            id: true,
            profileId: true,
            project_description: true,
            ProfileProjectImageData:{
                select:{
                    id:true,
                    image_content_type: true,
                    image_data: true,
                }
            },
        }
    })

    return res.render('editProject', {data})
};