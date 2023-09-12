const sequelize = require('../config/sequelizeConfig');
const { DataTypes } = require('sequelize');
const UserGrade = require('./User_Grade');

const Graduate_Info = sequelize.define('graduate_info', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    grade:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    tableName: 'graduate_info',
    timestamps: false
});

Graduate_Info.hasMany(UserGrade, {
    foreignKey: 'user_grade_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
})

module.exports = Graduate_Info;