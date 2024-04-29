import { z } from 'zod'

export const ContactsAdapter = z.object({
    userEmail: z.string().email(),
    userInstagram: z.string(),
    userWhatsApp: z.string(),
    // userPosGrad: z.string()
})