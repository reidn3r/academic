const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Company = sequelize.define('Company', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },

    register_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    },

    city_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    state_id:{
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    
    cnpj:{
        // type: DataTypes.INTEGER,
        type: DataTypes.STRING,
        allowNull: false        
    },

    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'company',
    timestamps: false
})

// module.exports = Company;
