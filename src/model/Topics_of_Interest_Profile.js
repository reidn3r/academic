const sequelize = require('../config/sequelizeConfig');
const { DataTypes } = require('sequelize')

const Topics_of_Interest_Profile = sequelize.define('topics_of_interest_profile', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    topic_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profile_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'topics_of_interest_profile',
    timestamps: false
})

module.exports = Topics_of_Interest_Profile;