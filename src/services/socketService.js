const sequelize = require('../config/sequelizeConfig');
const MessagesModel = require('../model/MessagesModel');

const socket = (io) => {
    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.on('render_data', async(data) => {
            const id = socket.handshake.query.registerId;
            const [messages, messagesMetadata] = await sequelize.query(`SELECT from_message_id, to_message_id, to_message_username, message, message_time FROM messages WHERE (to_message_id=${data.to_id} OR to_message_id=${id} )AND (from_message_id=${id} OR from_message_id=${data.to_id})`);
            io.to(socket.id).emit('message_content_loaded', {content: messages});
        })
        
        socket.on('save_message', async(data) => {
            const UserName = socket.handshake.query.Username;
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
    });
}


module.exports = socket;