const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const ProfileProjectImageData = require('./Profile_Project_Image_Data');

const ProfileProject = sequelize.define('profile_project_data', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    project_description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
    profile_image_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'profile_project_data',
    timestamps: false
});

ProfileProject.hasMany(ProfileProjectImageData,{
    foreignKey: 'project_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
});


module.exports = ProfileProject;