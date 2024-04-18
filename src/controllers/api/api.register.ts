import { CleanString } from '../../repository/clean-string';
import { LocationRepository } from '../../repository/location-repository';
import { UniversityRepository } from '../../repository/university-repository';

import { prisma } from '../../db/prisma';
import { formatISO } from 'date-fns';

import { RegisterRequestBody } from '../../adapters/register-profile-requestbody-adapter';

export const Register = async(req:any, res:any) => {
    const data = req.session.userData; //?
    if(!data) return res.redirect('/v1/register');
    
    const { nameInput, emailInput, cpfInput, birthInput, universityInput, cityInput, stateInput, userActivity, userGrade, userCourse } = RegisterRequestBody.parse(req.body);
    
    const locationRepository = new LocationRepository();
    const universityRepository = new UniversityRepository();
    const stringRepository = new CleanString();

    const cleanCpf:string = stringRepository.cleanString(cpfInput);
    if(!stringRepository.CPFisValid(cleanCpf)) return res.status(401).json({message: "CPF inválido"});

    const [foundUniversity, foundState, foundCity] = await Promise.all([
        universityRepository.findUniversityByName(universityInput),
        locationRepository.findStateByAcronym(stateInput),
        locationRepository.findCityByName(cityInput)
    ])

    if(!foundUniversity.id) return res.status(404).json({message: "Insira uma universidade válida"});
    if(!foundState || !foundState.id) return res.status(404).json({message: "Insira um estado válido"});

    if(!foundCity.id) return res.status(404).json({message: "Insira uma cidade válida"});
    if(foundCity.state_acr != foundState.state_acr) return res.status(404).json({message: "Insira uma cidáde válida"});
    
    try{
        //Pessoa(1) ou Empresa(2)
        const newRegisterType = await prisma.registerType.findFirst({ where: { type: "Pessoa" }});
        if(!newRegisterType) await prisma.registerType.create({ data: { type: "Pessoa "}});

        const user = await prisma.register.create({
            data:{
                registerTypeId: 1, //Pessoa
                User: {
                    create: {
                        cpf: cleanCpf,
                        birthday: formatISO(birthInput),
                        city: foundCity.city_name,
                        state: foundState.state_name,
                        email: emailInput,
                        password: data.hashPw,
                        name: nameInput,
                        university: foundUniversity.name,
                        user_course: userCourse,
                        user_sex: data.userSex,
                        userActivity: {
                            connectOrCreate:
                                {
                                    where: { user_activity: userActivity.toUpperCase() },
                                    create: { user_activity: userActivity.toUpperCase() }
                                },
                        }
                    }
                },
            }
        });

        // req.session.create_profile = {userData: data, profileData: {user}};
        req.session.create_profile = {userData: data, profileData: user};
        // req.session.userGrade = gradeQuery[0].id;
        return res.status(201).redirect('/v1/create');

    }
    catch(err){
        return res.status(500).json({message: "Internal server error"});
    }
    }
