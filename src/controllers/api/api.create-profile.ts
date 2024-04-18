import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { CreateProfileResquetBody } from '../../adapters/create-profile-requestbody-adapter';
import { CreateProfileSessionValidation } from '../../adapters/create-profile-session-adapter';
import { ProfileRepository } from '../../repository/profile-repository';

export const CreateProfile = async(req:any, res:any, next:any) => {
    try{
        const profileRepository = new ProfileRepository();
        const session = req.session.profile_data;
        
        console.log(session);

        const entity_data = CreateProfileSessionValidation.parse(session).profileData;
        if(!entity_data) return res.status(301).redirect('/v1/login');

        const { profileDesc } = CreateProfileResquetBody.parse(req.body);
        let blob:Buffer; let filename:string = ""; let fileMimetype:string;

        if(req.file){
            filename = req.file.filename;
            blob = req.file.buffer;
            fileMimetype = req.file.mimetype;
        } else{
            blob = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'images', 'default_user.png'));
            fileMimetype = 'Image/png';
        }

        await profileRepository.createProfileWithImage(profileDesc, fileMimetype, blob, session.profileData.id);

        if(filename.length > 0) await fsPromises.rm(path.join(__dirname, '..', '..', '..', 'temp', `${filename}`));
        req.session.profile_data = session;
        return res.redirect('/v1/create/contacts');
    }

    catch(err){
        console.log(err);
        return res.redirect('/v1/login');
    }
}
