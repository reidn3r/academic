const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Register = require('./Register');

const Register_Type = sequelize.define('register_type', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    type:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    tableName: 'register_type',
    timestamps: false
})

//Associations
Register_Type.hasMany(Register, {
    foreignKey: 'id_register_type',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})


module.exports = Register_Type;