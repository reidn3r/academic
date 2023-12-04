const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelizeConfig');
const TopicsProfile = require('./Topics_of_Interest_Profile');

const topicsInterest = sequelize.define('topics_of_interest', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
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

topicsInterest.hasMany(TopicsProfile, {
    foreignKey: 'topic_id',
    sourceKey: "id",
    onDelete: "CASCADE"
});

module.exports = topicsInterest;