const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelizeConfig");
const User = require('./User');

const University = sequelize.define('university', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    university_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'university',
    timestamps: false
})

University.hasMany(User, {
    foreignKey: 'university_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

module.exports = University;