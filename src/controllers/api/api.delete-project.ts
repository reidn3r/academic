import { prisma } from '../../db/prisma';
import { ProfileRepository } from '../../repository/profile-repository';
import { DeleteProjectAdapter } from '../../adapters/delete-project-adapter';

export const RemoveProject = async (req:any, res:any) => {
    const { projectId } = DeleteProjectAdapter.parse(req.body);
    const profileRepository = new ProfileRepository();

    const profileId = await profileRepository.getProfileIdByLoginToken(req, res);

    if (!profileId){
        return res.status(400).json({ message: "Authentication Required" });
    }

    const foundProject = await prisma.profile.findUnique({
        where: {
            id: profileId
        },
        select: {
            ProfileProjectData: {
                where: {
                    id: projectId
                }
            }
        }
    });

    if (foundProject?.ProfileProjectData.length == 0) {
        return res.status(404).json({ message: "Project not found" });
    }
    await prisma.profileProjectData.delete({
        where: {
            id:projectId,
            profileId
        }
    })
    
    return res.status(200).json({ foundProject });
}
