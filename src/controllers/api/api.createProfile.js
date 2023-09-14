const profileModel = require('../../model/Profile');
const imageModel = require('../../model/Profile_Image_Info');

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const dateFormat = require('../../public/utils/dateFormat');

const createProfile = async(req, res, next) => {
    try{
        const session = req.session.profile_data;
        const entity_data = session.profileData;    
            
        const { profileDesc } = req.body;
        if(!entity_data) return res.redirect('/v1/login');
        if(!profileDesc) return res.status(400).json({message: "Profile description required."});
        
        let blob = null; filename = false; fileMimetype=null;
        if(req.file){
            filename = req.file.filename;
            blob = req.file.buffer;
            fileMimetype = req.file.mimetype;
        } else{
            blob = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'images', 'default_user.png'));
            fileMimetype = 'Image/png';
        }
    
        //salva img. do perfil no bd
        const newImage = await imageModel.create({
            image_data: blob,
            image_content_type: fileMimetype,
            created_at: dateFormat(new Date())
        });
    
        //salva novo perfil no bd
        const newProfile = await profileModel.create({
            register_id: entity_data.register_id,
            name: entity_data.name,
            contact_email: entity_data.email,
            description: profileDesc,
            created_at: dateFormat(new Date()),
            updated_at: dateFormat(new Date()),
            image_id: newImage.id
        });
    
        //update no profile_id de image_info
        newImage.profile_id = newProfile.id;
        await newImage.save();
    
        if(filename) await fsPromises.rm(path.join(__dirname, '..', '..', '..', 'temp', `${filename}`));
    
        req.session.profile_data = session;
        
        return res.redirect('/v1/create/contacts');
    }

    catch(err){
        console.log(err);
        return res.redirect('/v1/login');
    }
}

module.exports = createProfile;