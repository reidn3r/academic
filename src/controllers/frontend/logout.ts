import { RedisClient } from '../../config/redis-config'
import jwt from 'jsonwebtoken';
import { SessionRepository } from '../../repository/session-repository';

import dotenv from 'dotenv';
dotenv.config();

export const Logout = async(req:any, res:any) => {
    const sessionRepository = new SessionRepository();

    //Verifica se existe o token de login
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');

    //Salvar info de logout no banco de dados
    try{
        jwt.verify(token, process.env.JWT_SECRET || "default", async(err:any, decoded:any) => {
            if(decoded){
                await sessionRepository.setLogoutDate(decoded.session_id);
            }
        })
        
        //Invalida o token movendo para o set de tokens inválidos
        const tokenExists = await RedisClient.sIsMember('valid_tokens', token);
        if(tokenExists){
            await RedisClient.sMove('valid_tokens', 'invalid_tokens', token);
        }    
    
        //Exclui o token e faz o redirect
        res.clearCookie('loginToken');
        return res.status(200).redirect('/v1');
    }
    catch(err){
        console.log(err);
        return res.status(301).redirect('/v1');
    }
}