const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Profile_Links = sequelize.define('profile_links', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },

    link_type_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    },

    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'profile_links',
    timestamps: false
});

module.exports = Profile_Links;