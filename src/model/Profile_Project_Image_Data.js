const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const ProfileImageData = sequelize.define('profile_project_image_data', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    project_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    image_data:{
        type: DataTypes.BLOB,
        allowNull: false
    },

    image_content_type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'profile_project_image_data',
    timestamps: false
});


module.exports = ProfileImageData;