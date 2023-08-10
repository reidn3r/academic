const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Logout = sequelize.define('logout', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    
    login_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    logout_date:{
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    tableName: 'logout',
    timestamps: false
})

module.exports = Logout;