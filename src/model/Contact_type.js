const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

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


module.exports = contactType;