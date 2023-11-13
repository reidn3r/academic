const UserModel = require('../../model/User');
const sequelize = require('../../config/sequelizeConfig');

const messages = async(req, res) => {
    const {from_id, to_id} = req.params;

    if(!from_id || !to_id) return res.status(400).json({"message": "Missing user id"});

    const foundFromUser = await UserModel.findOne({where: {register_id: from_id}});
    const foundToUser = await UserModel.findOne({where: {register_id: to_id}});

    if(!foundFromUser || !foundToUser) return res.status(404).json({"message": "User not found."});

    const [messages, messagesMetadata] = await sequelize.query(`SELECT from_message_id, to_message_id, to_message_username, message, message_time FROM messages WHERE (to_message_id=${to_id} OR to_message_id=${from_id} )AND (from_message_id=${from_id} OR from_message_id=${to_id}) ORDER BY id ASC`);
    return res.send({data: messages});
}

module.exports = messages;