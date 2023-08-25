const createProfile = (req, res) => {
    const profileData = req.session.profile;
    if(!profileData) return res.redirect('/v1');
    req.session.profile = profileData;
    res.render('createProfile', {context: profileData});
}

module.exports = createProfile;