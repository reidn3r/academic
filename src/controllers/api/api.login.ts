import { UserRepository } from '../../repository/user-repository';
import { ProfileRepository } from '../../repository/profile-repository';
import { SessionRepository } from '../../repository/session-repository';
import { z } from 'zod';
import { LoginAdapter } from '../../adapters/login-adapter';

import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '..', 'config.env') });

export const Login = async(req:any, res:any) => {
    const { emailInput, passwordInput } = LoginAdapter.parse(req.body);

    const userRepository = new UserRepository();
    const profileRepository = new ProfileRepository();
    const sessionRepository = new SessionRepository();
    const secret:Secret = process.env.JWT_SECRET as Secret;

    let foundUser = await userRepository.findUserByEmail(emailInput);
    if(!foundUser) return res.status(404).json({message: "Email not registered."});

    const matchPw = await bcrypt.compare(passwordInput, foundUser.password);
    if(!matchPw) return res.status(401).json({message: "Authetication error, try again"});
    
    const foundProfile = await profileRepository.findProfileByEmail(emailInput);
    
    if(matchPw && foundProfile && foundProfile.Profile){
        try{
            if(foundProfile?.Profile.length == 0){
                const opt = "pessoa";
                const userData = { nameInput: foundUser.name, emailInput:foundUser.email, hashPw:foundUser.password, optradio: opt, userId: foundProfile.id };
                
                req.session.create_profile = {userData: userData, profileData: foundUser};
                return res.redirect('/v1/create/');
            }
            

            const user_session = await sessionRepository.createNewSession(foundProfile.Profile[0].id);

            if(user_session){
                const payload = { id: foundUser.id, 
                                    profile_id: foundProfile.Profile[0].id, 
                                    session_id: user_session.id,
                                };
    
                const token = jwt.sign(payload, secret , { expiresIn: '4h' });
                res.cookie('loginToken', token, {
                    httpOnly: true,
                    secure: true
                });        
                return res.redirect(`/v1/profile/${foundProfile!.Profile[0].id}`);
            }
            else{
                return res.status(500).json({ message: "Failed to create Session "});
            }

        }
        catch(err){
            console.log(err);
            return res.status(401).json({message: "Login error"});
        }
    }        
}