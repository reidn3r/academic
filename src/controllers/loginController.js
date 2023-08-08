const UserModel = require('../model/User');
const CompanyModel = require('../model/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', 'config.env')});

const login = (req, res) => {
    res.render('login');
}

const loginController = async(req, res) => {
    const { emailInput, passwordInput } = req.body;

    if(!emailInput || !passwordInput) return res.status(404).json({message: "missing data"});

    let foundEmail = await UserModel.findOne({ where: {email:emailInput}});
    if(!foundEmail){
        foundEmail = await CompanyModel.findOne({ where: {email: emailInput }});
    }
    if(!foundEmail) return res.status(404).json({message: "Email nao cadastrado."});

    const mathPw = await bcrypt.compare(passwordInput, foundEmail.password);
    if(!mathPw) return res.status(401).json({message: "Senha incorreta"});
    
    if(mathPw){
        try{
            const payload = { id: foundEmail.id, username: foundEmail.name};
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});
                
            res.cookie('loginToken', token, {
                httpOnly: true,
                secure: true
            });
            res.redirect('/v1');
        }
        catch(err){
            return res.status(401).json({message: err});
        }
        }        
}

module.exports = { login, loginController };