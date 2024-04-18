
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../repository/user-repository';

export const InitRegister = async(req:any, res:any) => {
    const userRepository = new UserRepository();

    const requestBody = z.object({
        nameInput: z.string().min(1),
        emailInput: z.string().email(),
        pwInput: z.string().min(6),
        confirmPwInput: z.string().min(6),
        userSex: z.string().min(1),
    })
    const { nameInput, emailInput, pwInput, confirmPwInput, userSex } = requestBody.parse(req.body);
    
    if(pwInput !== confirmPwInput) return res.status(401).json({message: "As senhas devem serem iguais"});
    const hashPw = await bcrypt.hash(pwInput, 15);

    const foundUserEmail = await userRepository.findUserByEmail(emailInput);
    if(foundUserEmail) return res.status(401).json({message: "Email ja cadastrado"});

    if(!userSex) return res.status(401).json({message: "Masculino ou Feminino deve ser selecionado"})
    
    req.session.userData = { nameInput, emailInput, hashPw, userSex };
    return res.redirect('register/user');
}
