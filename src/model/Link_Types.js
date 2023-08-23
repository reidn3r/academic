const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const ProfileLinks = require('./Profile_Links');

const Link_Types = sequelize.define('link_types', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'link_type',
    timestamps: false
});

Link_Types.hasMany(ProfileLinks, {
    foreignKey: 'link_type_id',
    sourceKey: 'id',
    onDelete: "CASCADE"
});

module.exports = Link_Types;