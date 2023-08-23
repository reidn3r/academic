const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const profileContacts = require('./Profile_Contacts');

const contactType = sequelize.define('contact_type', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    type:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'contact_type',
    timestamps: false
});

contactType.hasMany(profileContacts, {
    foreignKey: 'contact_type_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
})

module.exports = contactType;