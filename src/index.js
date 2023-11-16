const path = require('path');
const express = require("express");
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisClient = require('./config/redisConfig');
const dbConnect = require('./config/sequelizeConnect');

require('dotenv').config({path: path.join(__dirname, '..', 'config.env')});

const app = express();
const PORT = process.env.PORT || 3030;

//socket.io
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.set('socketio', io);

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session(require('./config/sessionConfig')));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, "public", "favicon", "favicon.ico")));
app.use('/v1', require('./routes/frontend.router'));
app.use('/v1/api', require('./routes/api.router'));

//Associations
const associations = require('./model/Associations');

//Start Server
const ExpressServer = async() => {
    try{
        await dbConnect();
        // app.listen(PORT, () => console.log(`server running at: http://localhost:${PORT}/v1`));
        server.listen(PORT, () => console.log(`server running at: http://localhost:${PORT}/v1`));
        await redisClient.connect();
    }
    catch(err){
        // client.quit();
        throw err;
        
    }
}


ExpressServer();