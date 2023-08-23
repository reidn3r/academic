const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');
const User = require('./User');
const Profile = require('./Profile');

const Register = sequelize.define('register', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },

    id_register_type:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'register',
    timestamps: false
})


//Associations
Register.hasOne(User, {
    foreignKey: 'register_id',
    sourceKey: 'id',
    onDelete: 'CASCADE'
})


// Register.hasOne(Company, {
//         foreignKey: 'register_id',
//         sourceKey: 'id',
//         onDelete: 'CASCADE'
// })


Register.hasOne(Profile, {
    foreignKey: 'register_id',
    sourceKey: 'id'
})


module.exports = Register;