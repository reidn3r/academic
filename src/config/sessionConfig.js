const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', 'config.env')});

module.exports = {
    secret: process.env.SS_KEY,
    httpOnly: true,
    secure: false,
    cookie: { secure: false },
    saveUninitialized: true,
    resave: false,
    maxAge: 60
}