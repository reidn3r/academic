const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const User_Grade = require('./User_Grade');



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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        
    },

    user_sex:{
        type: DataTypes.STRING,
        allowNull: false
    },

    user_grade_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    user_course:{
        type: DataTypes.STRING,
        allowNull: false
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

User.hasOne(User_Grade, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
})


module.exports = User;