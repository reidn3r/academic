const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Register = sequelize.define('register', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    id_register_type:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'register',
    timestamps: false
})

module.exports = Register;