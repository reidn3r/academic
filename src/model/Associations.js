const Image_Info = require('./Image_Info');
const Profile = require('./Profile');
const Login = require('./Login');
const Logout = require('./Logout');

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
