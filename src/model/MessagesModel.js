const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeConfig");

const MessagesModel = sequelize.define('messages', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    from_message_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    to_message_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    to_message_username: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    message:{
        type: DataTypes.STRING(200),
        allowNull: false
    },

    message_time:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    tableName: 'messages',
    timestamps: false
})

module.exports = MessagesModel;