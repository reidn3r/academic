const path = require('path');
const db = require('./config/dbConfig');
const express = require("express");
const app = express();
const morgan = require('morgan');
require('dotenv').config({path: path.join(__dirname, '..', 'config.env')});

const PORT = process.env.PORT;

//logger
app.use(morgan('dev'));

//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view-engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//router
app.use('/v1', require('./routes/router'));

const dbConnect = async() => {
    await db.authenticate();
    console.log(`sequelize connected at PORT: ${process.env.db_port}`);
    app.listen(PORT, () => console.log(`server running at: http://localhost:${PORT}`));
}
dbConnect();