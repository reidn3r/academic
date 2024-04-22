import { prisma } from '../../db/prisma';
import { ImageBody } from '../../adapters/image-body';
import { ProfileRepository } from '../../repository/profile-repository';

export const CreateProject = async(req:any ,res:any) => {
    /* 
        body: descrição do projeto
        req.files: imagens do projeto 
    */

    const { projectDesc } = req.body;

    const profileRepository = new ProfileRepository();
    const profileId = await profileRepository.getProfileIdByLoginToken(req, res);
    
    let images:ImageBody[] = [];
    try{
        if(req.files){
            req.files.forEach(img => {
                images.push({
                    filename: img.originalname,
                    mimeType:img.mimetype,
                    blob:img.buffer
                });
            })
        }
        
        if(profileId){
            await prisma.profileProjectData.create({
                    data: {
                        project_description: projectDesc,
                        profileId: profileId,
                        ProfileProjectImageData: {
                            create: images.map((image:ImageBody) => ({
                                image_content_type: image.mimeType,
                                image_data: image.blob,
                            }))
                        }
                }
            })
            return res.status(301).redirect(`/v1/profile/${profileId}/projects`);
        }

        return res.status(404).json({ message: "Error while creating projects" });
    }
    catch(err){
        throw new Error("Erro ao cirar novo projeto.");
    }

}