const createProfile = (req, res) => {
    const profileData = req.session.profile;
    if(!profileData) return res.redirect('/v1');
    res.render('createProfile', {context: profileData});
}

module.exports = createProfile;