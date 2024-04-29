import { ProfileRepository } from '../../repository/profile-repository';
import  { GetProfileAdapater } from '../../adapters/get-user-profile-adapter';

export const GetUserProfile = async(req:any, res:any) => {
    const profile = new ProfileRepository();
    
    const { id } = GetProfileAdapater.parse(req.params);
    if(id == 0) return res.status(301).redirect('/v1');

    const ProfileData = await profile.getProfileDataById(id);
    if(!ProfileData) return res.status(301).redirect('/v1');

    // const auth:boolean = req.authorized; //?
    const auth:boolean = true; //?
    const context = { ProfileData, auth };

    return res.render('profile', {context});
}