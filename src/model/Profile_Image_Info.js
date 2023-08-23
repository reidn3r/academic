const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const profileImageInfo = sequelize.define('profile_image_info', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    image_data:{
        type: DataTypes.BLOB,
        allowNull: false
    },

    image_content_type:{
        type: DataTypes.STRING,
        allowNull: false
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = profileImageInfo;