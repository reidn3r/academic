const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const City_Info = sequelize.define('city_info', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    city_name:{
        type:DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'city_info',
    timestamps: false
});

module.exports = City_Info;