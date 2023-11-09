const sequelize = require('../../config/sequelizeConfig');

const messages = async(req, res) => {
    const {from_id, to_id} = req.params;
    const [messages, messagesMetadata] = await sequelize.query(`SELECT from_message_id, to_message_id, to_message_username, message, message_time FROM messages WHERE (to_message_id=${to_id} OR to_message_id=${from_id} )AND (from_message_id=${from_id} OR from_message_id=${to_id})`);
    console.log(messages);
    return res.send({data: messages});
    // return res.status(200).json({data: messages});
}

module.exports = messages;