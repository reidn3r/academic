export const checkAuthenticationAtLogin = (req:any, res:any, next:any) =>{
    /* 
        1. Middleware usado na rota de login
            - Se o usuário já está autenticado,
            não é permitido se autenticar novamente
            
        2. Usado para as rotas de registro
            - Se autenticado, não pode acessar a página
    */
    
    if(req.cookies.loginToken) return res.redirect('/v1');
    next();
}