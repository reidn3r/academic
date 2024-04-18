import { z } from 'zod';

export const LoginAdapter  = z.object({
    emailInput: z.string().email(),
    passwordInput: z.string()
})