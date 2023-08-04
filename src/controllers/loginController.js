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
    console.log(emailInput, passwordInput);

    if(!emailInput || !passwordInput) return res.status(404).json({message: "missing data"});

    let foundEmail = await UserModel.findOne({ where: {email:emailInput}});
    if(!foundEmail){
        foundEmail = await CompanyModel.findOne({ where: {email: emailInput }});
    }
    if(!foundEmail) return res.status(404).json({message: "Email nao cadastrado."});

    const mathPw = await bcrypt.compare(passwordInput, foundEmail.password);
    if(!mathPw) return res.status(401).json({message: "Senha incorreta"});
    
    if(mathPw){
            await jwt.sign({
                id: foundEmail.id,
                username: foundEmail.name,
            }, 
            process.env.JWT_SECRET, 
            { algorithm: process.env.ALGORITHM },
            { expiresIn: process.env.EXPIRATION })
    }

    // res.json({message: foundEmail});
    res.redirect('/v1');
}

module.exports = { login, loginController };