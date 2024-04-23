import { prisma } from "../../db/prisma";
import { ProfileRepository } from "../../repository/profile-repository";
export const EditProject = async(req:any, res:any) => {
    /* 
        1. receber o array contendo o id das imagens alteradas
            1.1: Se o array tem tamanho maior que 0,
            alterar no bd as novas imagens
    
        2. receber o array contendo o id das imagens removidas
            2.1: Se o array tem tamanho maior que 0,
            remover no bd as imagens
    
        3. Receber o texto e alterar se houver alteração.
    */
    // const { profileId, projectId } = ApiEditProjectAdapter.parse(req.params);
    const { project_description, changed_ids, removed_ids, project_id } = req.body;


    
    const profileRepository = new ProfileRepository();
    const profileId = await profileRepository.getProfileIdByLoginToken(req, res);
    const projectId:number = Number(project_id);
    
    
    const changed_image_ids:number[] = JSON.parse(changed_ids).sort();
    const removed_image_ids:number[] = JSON.parse(removed_ids).sort();
    /* 
        1. Os indices são ordenados uma vez que em tela são renderizados por ordem de id e ao serem enviados,
        também são recebidos de forma ordenada
   */
    if(!profileId) return res.status(400).json({ message: "Authentication required" });

    const foundProject = await prisma.profile.findUnique({
        where: {
            id: profileId
        },
        select: {
            ProfileProjectData:{
                where: {
                    id: projectId
                }
            }
        }
    });


    try{
        if(foundProject){
            //Atualiza a descricao do projeto
            await prisma.profileProjectData.update({
                where:{
                    id: projectId
                },
                data:{
                    project_description
                }
            })
        }

        if(foundProject && foundProject.ProfileProjectData.length > 0 && removed_image_ids.length > 0){
            //Remove as imagens
            await prisma.profileProjectImageData.deleteMany({
                where: {
                    id : {
                        in: removed_image_ids
                    }
                }
            });
            changed_image_ids.map(async(id:number, idx:number) => {
                if(!removed_image_ids.includes(id)){
                    //Atualiza as imagens
                    await prisma.profileProjectImageData.update({
                        where:{
                            id
                        },
                        data:{
                            image_content_type: req.files[idx].mimetype,
                            image_data: req.files[idx].buffer
                        }
                    })
                }
            })
        }
        return res.status(200).json({ message: "project updated" });
    }
    catch(err){
        console.log(err);
        throw new Error("Error while updating project");
    }
}

