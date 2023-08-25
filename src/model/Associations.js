const Image_Info = require('./Profile_Image_Info');
const Profile = require('./Profile');
const Login = require('./Login');
const Logout = require('./Logout');
const ProfileProjectData = require('./Profile_Project_Data')
const ProfileLinks = require('./Profile_Links');
const User_Grade = require('./User_Grade');
const Topics_of_Interest_Profile = require('./Topics_of_Interest_Profile');
const ProfileImageInfo = require('./Profile_Image_Info');

Image_Info.hasMany(Profile, {
    foreignKey: 'login_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

Profile.hasMany(Image_Info, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

Profile.hasMany(Logout, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

Profile.hasMany(Login, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})


Profile.hasMany(ProfileProjectData, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
});

Profile.hasMany(ProfileImageInfo, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
});

Profile.hasMany(ProfileLinks, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
});

Profile.hasOne(User_Grade, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
})

Profile.hasMany(Topics_of_Interest_Profile, {
    foreignKey: 'profile_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
})

