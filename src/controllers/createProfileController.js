const createProfile = (req, res) => {
    const profileData = req.session.profile;
    res.render('createProfile', {context: profileData});
}

module.exports = createProfile;