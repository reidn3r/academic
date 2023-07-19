const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Login = sequelize.define('login', {
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

    login_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'login',
    timestamps: false
})

module.exports = Login;