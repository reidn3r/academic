const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

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

module.exports = State_Info;