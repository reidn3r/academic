
const profileContact = (req, res) => {
    const profileData = req.session.profile_data;
    console.log(`profiledata: ${profileData}`);

    if(!profileData) return res.redirect('/v1');

    const email = profileData.userData.emailInput;
    const userGrade = req.session.userGrade;

    const context = {email, userGrade};
    return res.render('profileContacts', {context: context});
}

module.exports = profileContact;