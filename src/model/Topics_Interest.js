const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelizeConfig');

const topicsInterest = sequelize.define('topics_of_interest', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    topic:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'topics_of_interest',
    timestamps: false
});


module.exports = topicsInterest;