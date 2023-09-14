const CityModel = require('../../model/City_Info');
const StateModel = require('../../model/State_Info');
const UniveristyModel = require('../../model/University');
const GraduateInfoModel = require('../../model/Graduate_Info');

const queryString = require('node:querystring');

const search = async(req, res) => {
    /* 
        1. Busca os campos, depois o dado de usuário e retorna o register_id para ser feito a busca dos perfis
        2. Campos de string: passar para lower-case antes de tratar/usar
    */
    const { nameInput, courseInput, specInput, gradInput, universityInput, cityInput, stateInput, topicInput } = req.body;
    let data = {};
    if(nameInput.length > 0){
        data["name"] = nameInput;
    }

    //Curso de grad. 
    let userCourseLowerCase =  "";
    if(courseInput){
        userCourseLowerCase = courseInput.toLowerCase();
        if(userCourseLowerCase.length > 0){
            data["user_course"] = userCourseLowerCase;
        }
    }

    //Graduação/Pós
    let gradString = ""; let gradInfo = null;
    if(gradInput){
        for(let i=0; i<gradInput.length; i++){
            if(gradInput[i] != " "){
                gradString += gradInput[i].toLowerCase();
            }
        }
    }
    if(gradString.length > 0){
        gradInfo = await GraduateInfoModel.findOne({where: {grade: gradString}});
        if(gradInfo){
            data["user_grade_id"] = gradInfo.id;
        }
    }
    
    //id da universidade
    let univInfo = null;
    if(universityInput){
        univInfo = await UniveristyModel.findOne({where: {university_name: universityInput.toUpperCase()}});
        if(univInfo){
            data["university_id"] = univInfo.id;
        }
    }

    //id da cidade
    let city = ""; let cityData = null;
    if(cityInput){
        const cityInfo = cityInput.split(' ');
        if(cityInput){
            for(let i=0; i< cityInfo.length; i++){
                city += cityInfo[i][0].toUpperCase() + cityInfo[i].slice(1);
                if(i == cityInfo.length - 2){
                    city += " ";
                }
            }
        }
    }    
    if(cityInput && city.length > 0){
        cityData = await CityModel.findOne({where: {city_name: city}});
        if(cityData){
            data["city_id"] = cityData.id;
        }
    }
    
    //id do estado
    let stateData = null;
    if(stateInput){
        stateData = await StateModel.findOne({where: {state_name: stateInput}});
        if(stateData){
            data["state_id"] = stateData.id;
        }
    }
    if(Object.keys(data).length == 0) return res.redirect('/v1');
    
    const url = queryString.stringify(data);
    return res.redirect(`/v1/search/?${url}`);
}


module.exports = search;