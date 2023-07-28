const UserModel = require('../model/User');
const CompanyModel = require('../model/Company');
const bcrypt = require('bcrypt');

const registerPage = (req, res) => {
    res.render('register');
}

const registerController = async(req, res) => {
    const { nameInput, emailInput, pwInput, confirmPwInput, optradio } = req.body;
    if(!nameInput || !emailInput || !pwInput || !confirmPwInput || !optradio ) return res.status(401).json({message: "missing data"})

    if(pwInput.length < 6) return res.status(401).json({message: "Senha deve ter pelo menos 6 caracteres."});

    if(pwInput !== confirmPwInput) return res.status(401).json({message: "As senhas devem serem iguais"});
    const hashPw = await bcrypt.hash(pwInput, 15);
    
    const foundCompanyEmail = await CompanyModel.findOne({where: {email:emailInput}});
    const foundUserEmail = await UserModel.findOne({where: {email:emailInput}});
    if(foundUserEmail || foundCompanyEmail) return res.status(401).json({message: "Email ja cadastrado"});

    req.session.data = {nameInput, emailInput, hashPw, optradio };
    if(optradio == "pessoa"){
        return res.redirect('register/user');
    } 
    else if(optradio == 'empresa'){
        return res.redirect('register/company');
    }
    else{
        return res.status(401).json({message: "Pessoa ou empresa deve ser selecionado"})
    }
}

module.exports = { registerPage, registerController};