const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('user', {
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
        unique: true
    },
    
    university_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    
    user_activity_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    city_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    state_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },

    birthday:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;