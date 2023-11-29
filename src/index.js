const path = require('path');
const express = require("express");
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisClient = require('./config/redisConfig');
const dbConnect = require('./config/sequelizeConnect');
const sequelize = require('./config/sequelizeConfig');

require('dotenv').config({path: path.join(__dirname, '..', 'config.env')});

const app = express();
const PORT = process.env.PORT || 3030;

//socket.io
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// app.set('socketio', io);

//socket.io
io.on('connection', (socket) => {
    socket.on('render_data', async(data) => {
        const id = socket.handshake.query.registerId;
        const [messages, messagesMetadata] = await sequelize.query(`SELECT from_message_id, to_message_id, to_message_username, message, message_time FROM messages WHERE (to_message_id=${data.to_id} OR to_message_id=${id} )AND (from_message_id=${id} OR from_message_id=${data.to_id})`);
        io.to(socket.id).emit('message_content_loaded', {content: messages});
    })
    
    socket.on('save_message', async(data) => {
        await MessagesModel.create({
            from_message_id: data.from,
            from_message_username: UserName,
            to_message_id: data.to,
            to_message_username: data.to_message_username,
            message: data.message,
    })

    const newMessagePayload = { 
        message: data.message,
        to_message_id: data.to,
        from_message_id: data.from
    }
    io.emit('new_message', (newMessagePayload));
    })
})

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

module.exports = io;