
const createProfile = (req, res) => {
    const profileData = req.session.create_profile;
        //session vindo de api.loginController.js e api.registerController.js

    if(!profileData) return res.redirect('/v1');

    req.session.profile_data = profileData;
        //repassa o req.session.create_profile para a api

    req.session.create_profile = null;
        //delete da session

    res.render('createProfile', {context: profileData});
}

module.exports = createProfile;