import { GetProfileProjects } from '../../adapters/get-profile-projects';
import { ProfileRepository } from '../../repository/profile-repository';

export const ProfileProjects = async(req:any, res:any) => {

    const profileRepository = new ProfileRepository();
    
    const { id } = GetProfileProjects.parse(req.params); //profileId
    
    const data = await profileRepository.getProfileProjectsById(id);
    const remainingSize:number = data ? 5 - data.ProfileProjectData.length : 5 ; //Quantidade de projetos que ainda podem serem criados
    
    let context = { data, remainingSize }

    return res.render('profileProjects', {context});
}