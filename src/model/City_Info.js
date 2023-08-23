const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const User = require('./User');
const Company = require('./Company');

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

City_Info.hasMany(User, {
    foreignKey: 'city_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})

// City_Info.hasMany(Company, {
//     foreignKey: 'city_id',
//     sourceKey: 'id',
//     onDelete: 'CASCADE'
// })


module.exports = City_Info;