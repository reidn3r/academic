const sequelize = require('../config/sequelizeConfig');
const { DataTypes } = require('sequelize');

const User_Grade = sequelize.define('user_grade', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    user_grade_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "user_grade",
    timestamps: false
});


module.exports = User_Grade;