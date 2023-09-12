/* 
    1. Buscar: Universidade, Cidade, Estado, Tópicos (?)
*/

const CityModel = require('../../model/City_Info');
const StateModel = require('../../model/State_Info');
const UnivModel = require('../../model/University');
const GradModel = require('../../model/Graduate_Info');
const jwt = require('jsonwebtoken');

const homeController = async(req, res) => {
    const token = req.cookies.loginToken;
    let RegisterId = null;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!decoded) return res.redirect('/v1/logout');
        RegisterId = decoded.profile_id;
    })

    
    const States = await StateModel.findAll({attributes: ['state_name']});
    const Cities = await CityModel.findAll({attributes: ['city_name']});
    const Universities = await UnivModel.findAll({attributes: ['university_name']});
    const GradInfo = await GradModel.findAll({attributes: ['grade']});
    
    const context = { States, Cities, Universities, GradInfo, RegisterId };
    console.log(context)
    return res.render('search', {context});
}

module.exports = homeController;