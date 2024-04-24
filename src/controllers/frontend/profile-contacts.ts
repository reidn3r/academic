export const ProfileContacts = (req:any, res:any) => {
    const profileData = req.session.profile_data;
    if(!profileData) return res.redirect('/v1');

    const email = profileData.userData.emailInput;
    const userGrade = req.session.userGrade;

    const context = {email, userGrade};
    return res.render('profileContacts', {context: context});
}