const MessagesModel = require('../../../models/MessagesModel');
const { Op } = require('sequelize');

const getUsers = async(req, res) => {
    const { id } = req.params;
    const foundMessagesUser = await MessagesModel.findAll({
        attributes: ['from_message_username', 'to_message_username', 'to_message_id', 'from_message_id'],
        where: {[Op.or]: [{from_message_id: id},{ to_message_id: id}]},
        group: ["from_message_username", "to_message_username", "to_message_id", "from_message_id"]
    });
    
    let messagesUser = [];
    for(user of foundMessagesUser){
        let data = {}
        data["message_username"] = user.to_message_id !== id ? user.to_message_username : user.from_message_username;
        
        data["message_id"] = user.to_message_id !== id ? user.to_message_id : user.from_message_id;
        
        let exists = messagesUser.some(u => {
            return u.message_id === data.message_id
        })
        
        if(!exists) messagesUser.push(data);
    }
    
    return res.json({messagesUser});
}

module.exports = getUsers;