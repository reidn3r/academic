import { SearchAdapter } from '../../adapters/search-adapter';
import queryString from 'node:querystring';
import { ParamsIsNull } from '../../public/utils/check-search-params-is-null';

export const BuildSearchURL = async(req: Request, res:any) => {
    const { nameInput, courseInput, gradInput, universityInput, cityInput, stateInput, topicInput } = SearchAdapter.parse(req.body);

    const params:Array<string | null> = Object.values(SearchAdapter.parse(req.body))

    if(ParamsIsNull(params)) return res.status(301).redirect('/v1');

    let paramObject:any = {}
    try{
        /* 
            1. Responsável por construir a URL com 
                os parametros a serem buscados e fazer
                o redirecionamento
        */

        if(nameInput) paramObject.name = nameInput;
        if(courseInput) paramObject.course = courseInput;
        if(universityInput) paramObject.university = universityInput;
        if(cityInput) paramObject.city = cityInput;
        if(stateInput) paramObject.state = stateInput;
        if(topicInput) paramObject.topic = topicInput;
        if(gradInput) paramObject.grad = gradInput;

        const queryURL = queryString.stringify(paramObject);
        
        return res.status(301).redirect(`/v1/search/?${queryURL}`);
    }
    catch(err){
        throw new Error("Falha na busca de usuários");
    }

}