const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const profileModel = require('../../model/Profile');
const loginModel = require('../../model/Login');
const imageModel = require('../../model/Image_Info');
const dateFormat = require('../../public/utils/dateFormat');
const sequelize = require('../../config/sequelizeConfig');

const createProfile = async(req, res, next) => {
    const session = req.session.profile;
    const entity_data = session.profileData.newCompany || session.profileData.newUser;    
    const { profileDesc } = req.body;

    if(!entity_data) return res.redirect('/v1/register');
    if(!profileDesc) return res.status(400).json({message: "Profile description required."});
    
    let blob = null; filename = false;
    if(req.file){
        filename = req.file.filename;
        blob = req.file.buffer;
    } else{
        blob = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'images', 'default_user.png'));
    }

    //salva img. do perfil no bd
    const newImage = await imageModel.create({
        image_data: blob,
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

    //salva novo login no bd
    const newLogin = await loginModel.create({
        profile_id: newProfile.id,
        login_date: dateFormat(new Date())
    });

    //update no profile_id de image_info
    newImage.profile_id = newProfile.id;
    await newImage.save();

    if(filename) await fsPromises.rm(path.join(__dirname, '..', '..', '..', 'temp', `${filename}`));

    return res.redirect('/v1/login');
}

module.exports = createProfile;