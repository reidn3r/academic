const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '..', 'config.env')});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.database, process.env.db_username, process.env.db_password, {
    host: 'localhost',
    port: process.env.db_port,
    dialect: 'mysql'
})

module.exports = sequelize;