import { z } from 'zod';

export const RegisterRequestBody = z.object({
    nameInput: z.string(),
    emailInput: z.string().email(),
    cpfInput: z.string().min(11).max(14),
    birthInput: z.string(),
    universityInput: z.string(),
    cityInput: z.string(),
    stateInput: z.string(),
    userActivity: z.string(), //enum?
    userGrade: z.string(),
    userCourse: z.string()
})