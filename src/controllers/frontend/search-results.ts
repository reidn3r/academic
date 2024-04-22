import { prisma } from "../../db/prisma";
import { SearchService } from '../../services/search-services';


export const SearchResults = async(req:any, res:any) => {
    const { name, user_course, user_grade_id, university, city, state, page, interest } = req.query;

    /* 
        - Responsável por:
            1. Buscar perfis que casam com os dados recebidos
            2. Verificar a paginação
            3. Gerar os indices das proxima paginas
            4. Enviar no context o índice da pg. atual
    */
   
    try{
        // const searchRepository = new SearchService();
        
        // const result = await searchRepository.SearchForUsers(name, university, user_course, city, state, page);
        // const amount = await searchRepository.CountFoundUsers(name, university, user_course, city, state);
        
        const [result, amount] = await Promise.all([
            prisma.user.findMany({
                where:{
                    AND: [
                        { 
                            name: name?name:{} 
                        },
                        { 
                            university: university?university:{} 
                        },
                        {
                            user_course:user_course?user_course:{}
                        },
                        {
                            city: city?city:{}
                        },
                        {
                            state: state?state : {}
                        },
        
                        // {
                        //     userActivity: gradInput ? gradInput : {}
                        // },
                    ]
                },
                select:{
                    name: true,
                    university: true,
                    Profile: {
                        select:{
                            id: true,
                            description: true,
                            ProfileImageInfo:{
                                select:{
                                    image_data: true,
                                    image_content_type: true
                                }
                            },
                        }
                    }
                },
                skip: (page && page != 1) ? page * 10 : 0,
                take: 10,
            }),

            prisma.user.count({
                where:{
                    AND: [
                        { 
                            name: name?name:{} 
                        },
                        { 
                            university: university?university:{} 
                        },
                        {
                            user_course:user_course?user_course:{}
                        },
                        {
                            city: city?city:{}
                        },
                        {
                            state: state?state : {}
                        },
        
                        // {
                        //     userActivity: gradInput ? gradInput : {}
                        // },
                    ]
                },
            })
        ])
    
    
    
        const current_page = page ? page : 1;
        
        let pages_idx = [];
        for(let i=1; i<amount; i++){
            pages_idx.push(i);
        }
    
        let context = { result, pages_idx, current_page};
        return res.render('searchResults', {context});
    }
    catch(err){
        throw new Error("Erro ao buscar usuarios na base de dados");
    }
    

}