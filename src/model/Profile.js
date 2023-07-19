const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Profile = sequelize.define('profile', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    register_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },

    contact_email:{
        type: DataTypes.STRING, //255b
        allowNull: false
    },

    description:{
        type: DataTypes.TEXT, //64kb
        allowNull: false

    }, 
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },

    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    },

    image_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'profile',
    timestamps: false
})

module.exports = Profile;