const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Image_Info = sequelize.define('image_info', {
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
        unique: true,
    },

    image_data:{
        type: DataTypes.BLOB,
        allowNull: false
    },

    created_at:{
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'image_info',
    timestamps: false
})


module.exports = Image_Info;