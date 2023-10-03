const StateModel = require('../../model/State_Info');
const UnivModel = require('../../model/University');
const GradModel = require('../../model/Graduate_Info');
const InterestTopicsModel = require('../../model/Topics_Interest');
const jwt = require('jsonwebtoken');

const homeController = async(req, res) => {
    let RegisterId = null;
    const token = req.cookies.loginToken;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!decoded) return res.redirect('/v1/logout');
        RegisterId = decoded.profile_id;
    })
        
    const States = await StateModel.findAll({attributes: ['state_name']});
    const Universities = await UnivModel.findAll({attributes: ['university_name']});
    const GradInfo = await GradModel.findAll({attributes: ['grade']});
    const Topics = await InterestTopicsModel.findAll({attributes: ['topic']});
    
    const context = { States, Universities, GradInfo, RegisterId, Topics };
    return res.render('search', {context});
}

module.exports = homeController;