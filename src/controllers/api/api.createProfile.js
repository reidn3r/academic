const profileModel = require('../../model/Profile');
const loginModel = require('../../model/Login');
const imageModel = require('../../model/Image_Info');
const dateFormat = require('../../public/utils/dateFormat');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>  {
        cb(null, path.join(__dirname, '..', '..', '..', 'temp'));
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }

})

const createProfile = async(req, res) => {
    const session = req.session.profile;
    const entity_data = session.profileData.newCompany || session.profileData.newUser;    
    const { profileDesc } = req.body;

    if(!profileDesc) return res.status(400).json({message: "Profile description required."});

    //tratar o upload de imagens

    //salva img. do perfil no bd
    // const newImage = await imageModel.create({
    //     profile_id: newProfile.id,
    //     image_data: "",
    //     created_at: dateFormat(new Date())
    // });

    //salva novo perfil no bd
    // const newProfile = await profileModel.create({
    //     register_id: entity_data.register_id,
    //     name: entity_data.name,
    //     contact_email: entity_data.email,
    //     description: profileDesc,
    //     created_at: dateFormat(new Date()),
    //     updated_at: dateFormat(new Date()),
    //     image_id: newImage.id
    // });
    
    //salva novo login no bd
    // const newLogin = await loginModel.create({
    //     profile_id: newProfile.id,
    //     login_date: dateFormat(new Date())
    // });

    res.json({message: entity_data});
}

module.exports = createProfile;