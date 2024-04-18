import { z } from 'zod';

export const CreateProfileResquetBody = z.object({
    profileDesc: z.string().min(1).max(100)
})