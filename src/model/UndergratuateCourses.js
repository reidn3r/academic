const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelizeConfig");

const UnderGradCourses = sequelize.define('undergraduate_courses', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    university_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    university_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'undergraduate_courses',
    timestamps: false
})


module.exports = UnderGradCourses;