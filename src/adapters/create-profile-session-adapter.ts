import { z } from 'zod';

export const CreateProfileSessionValidation = z.object({
    userData: z.object({
        nameInput: z.string(),
        emailInput: z.string().email(),
        hashPw: z.string(),
        // optradio: z.string(),
        // userId: z.number().int().positive(),
        userSex: z.string().length(1)
    }),
    // profileData: z.object({
    //     id: z.number().int().positive(),
    //     university: z.string().min(1),
    //     city: z.string().min(1),
    //     state: z.string().min(1),
    //     email: z.string().email(),
    //     password: z.string(),
    //     name: z.string(),
    //     cpf: z.string().length(11),
    //     user_sex: z.string().length(1),
    //     user_course: z.string(),
    //     birthday: z.string(),
    //     createdAt: z.string(),
    //     userActivityId: z.number().int().positive(),
    //     registerId: z.number().int().positive(),
    // }),
    profileData: z.object({
        id: z.number().int().positive(),
        registerTypeId: z.number().int().positive(),
    }),
})