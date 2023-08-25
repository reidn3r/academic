const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const PosGradeInfo = sequelize.define('user_pos_grade_info', {
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

    pos_grad_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'user_pos_grade_info',
    timestamps: false
})

module.exports = PosGradeInfo;