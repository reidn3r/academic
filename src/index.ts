import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { RedisClient } from './config/redis-config';
import { CreateJSON } from './public/utils/create-json'; 

const app = express();
const PORT = process.env.PORT || 3030;

//socket.io
const server = require('http').createServer(app);
// const { Server } = require('socket.io');
// import { Server } from 'socket.io';
// const io = new Server(server);

//socket.io
// const SocketService = require('./services/socketService');
// SocketService(io);

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


//Create JSON file
const json = new CreateJSON();

//Start Server
const ExpressServer = async() => {
    try{
        await json.execute();
        await RedisClient.connect();
        // app.listen(PORT, () => console.log(`server running at: http://localhost:${PORT}/v1`));
        server.listen(PORT, () => console.log(`server running at: http://localhost:${PORT}/v1`));
    }
    catch(err){
        throw err;
    }
}


ExpressServer();