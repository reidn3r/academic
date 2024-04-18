import jwt, { Secret } from 'jsonwebtoken'

import { LocationRepository } from '../../repository/location-repository';
import { UniversityRepository } from '../../repository/university-repository';
import { GraduationRepository } from '../../repository/graduation-repository';
import { TopicsRepository } from '../../repository/topics-repository';

import path from 'path';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config({ path: path.join(__dirname, '..', '..', '..', 'config.env') })

export const Main = async(req:Request, res:Response) => {
    let profileId:number = 0;
    const token = req.cookies.loginToken; 
    const secret:Secret = process.env.JWT_SECRET as Secret;
    
    jwt.verify(token, secret, (err:any, decoded:any) => {
        if(!decoded) return res.redirect('/v1/logout');
        profileId = decoded.profile_id;
    })

    const localRepository = new LocationRepository();
    const universityRepository = new UniversityRepository();
    const graduationRepository = new GraduationRepository();
    const topicRepository = new TopicsRepository();

    /* 
        Buscar:
            1. todos os cursos *
            2. todos os estados *
            3. todas as universidades *
            4. Tipos de graduação (grad ou pos grad) *
            5. topicos de interesse
        Enviar no context e fazer renderizar em tela
    */
    const [courses, states, universities, graduation, topicsInterest] = await Promise.all([
        universityRepository.findAllCourses(),
        localRepository.findAllStates(),
        universityRepository.findAllUniversities(),
        graduationRepository.findAllGraduation(),
        topicRepository.findAllTopics()
    ])

    const context = { courses, states, universities, graduation, topicsInterest, profileId };

    return res.render('search', {context});
}
