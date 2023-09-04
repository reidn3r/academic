
const createProfile = (req, res) => {
    const profileData = req.session.create_profile;
    // console.log(`profile_data: ${JSON.stringify(profileData)}`);
    if(!profileData) return res.redirect('/v1');
    // req.session.profile = profileData;
    req.session.profile_data = profileData;
    res.render('createProfile', {context: profileData});
}

module.exports = createProfile;