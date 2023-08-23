const UserModel = require('../../model/User');
const loginModel = require('../../model/Login');
const sequelize = require('../../config/sequelizeConfig');
const dateFormat = require('../../public/utils/dateFormat')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

require('dotenv').config({path: path.join(__dirname, '..', 'config.env')});

const loginController = async(req, res) => {
    const { emailInput, passwordInput } = req.body;

    if(!emailInput || !passwordInput) return res.status(404).json({message: "missing data"});

    let foundEmail = await UserModel.findOne({ where: {email:emailInput}});
    // if(!foundEmail){
    //     foundEmail = await CompanyModel.findOne({ where: {email: emailInput }});
    // }
    if(!foundEmail) return res.status(404).json({message: "Email nao cadastrado."});

    const mathPw = await bcrypt.compare(passwordInput, foundEmail.password);
    if(!mathPw) return res.status(401).json({message: "Senha incorreta"});
    
    if(mathPw){
        try{
            const [foundProfile, metadata] = await sequelize.query(`SELECT * FROM profile WHERE contact_email="${emailInput}" LIMIT 1`);
            if(foundProfile.length == 0){
                const opt = foundEmail.cpf ? "pessoa" : "empresa";
                const userData = { nameInput: foundEmail.name, emailInput:foundEmail.email, hashPw:foundEmail.password, optradio: opt};

                req.session.profile = {userData: userData, profileData: foundEmail};
                return res.redirect('/v1/create');
            }
                const payload = { id: foundEmail.id, profile_id: foundProfile[0].register_id};
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h'});
                    
                res.cookie('loginToken', token, {
                    httpOnly: true,
                    secure: true
                });
                
                await loginModel.create({
                    profile_id: foundProfile[0].register_id,
                    login_date: dateFormat(new Date())
                });

                return res.redirect(`/v1/profile/${foundProfile[0].register_id}`);
            }
        catch(err){
            return res.status(401).json({message: err});
        }
    }        
}

module.exports = loginController;