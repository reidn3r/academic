const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const profileContacts = sequelize.define('profile_contacts', {
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

    contact_type_id:{
        type: DataTypes.INTEGER,
        allowNull: false,    
    },

    contact_content:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "profile_contacts",
    timestamps: false
});

module.exports = profileContacts;