const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');
const Company = require('./Company');

const State_Info = sequelize.define('state_info', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    state_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'state_info',
    timestamps: false
})

State_Info.hasMany(User, {
    foreignKey: 'state_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

State_Info.hasMany(Company, {
    foreignKey: 'state_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

module.exports = State_Info;