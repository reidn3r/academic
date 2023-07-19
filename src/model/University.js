const { DataTypes } = require('sequelize');
const sequelize = require("../config/dbConfig");

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


module.exports = University;