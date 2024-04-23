import { z } from 'zod';
export const GetProfileProjects = z.object({
    // id: z.coerce.number()
    id: z.coerce.number().int().transform(id => Math.abs(id))
})