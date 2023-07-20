const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');

const User_Activity = sequelize.define('user_activity', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    user_activity:{
        type: DataTypes.STRING,
        allowNull: false,   
        unique: true
    }
},{
    tableName: 'user_activity',
    timestamps: false
})


User_Activity.hasMany(User, {
    foreignKey: 'user_activity_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})


module.exports = User_Activity;