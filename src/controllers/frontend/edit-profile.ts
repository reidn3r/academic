import { GetProfileAdapater } from "../../adapters/get-user-profile-adapter";
import { LocationRepository } from "../../repository/location-repository";
import { UniversityRepository } from "../../repository/university-repository";
import { ProfileRepository } from "../../repository/profile-repository";

export const EditProfile = async(req:any, res:any) => {
    const { id } = GetProfileAdapater.parse(req.params);

    const locationRepository = new LocationRepository();
    const universityRepository = new UniversityRepository();
    const profileRepository = new ProfileRepository();

    const [data, states, universities] = await Promise.all([
        profileRepository.getProfileDataForEditingById(id),
        locationRepository.findAllStates(),
        universityRepository.findAllUniversities(),
    ])
    
    
    const context = { data, states, universities };
    // return res.status(200).json({ context });


    return res.render('editProfile', { context });
}
