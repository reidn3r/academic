import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '..', '..', 'config.env') });

export const checkIfUserIsAuthorizedToGetProfilePage = (req:any, res:Response, next:NextFunction) => {
    /*
        - Verifica se o usuário é autorizado 
        a entrar em uma rota do tipo /index/:id
    */

    const { id } = req.params;
    const token = req.cookies.loginToken;
    if(!token) return res.redirect('/v1/login');

    const secret:Secret = process.env.JWT_SECRET as Secret;
    jwt.verify(token, secret, (err:any, decoded:any) => {
        if(!decoded){
            req.authorized = false;
            return res.redirect('/v1/logout');
        }
        req.authorized = decoded.profile_id == id ? true : false;
        res.locals.userRegisterId = decoded.profile_id;
    })

    next();
}
