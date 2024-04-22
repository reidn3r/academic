import { z } from 'zod';
export const GetProfileProjects = z.object({
    id: z.coerce.number()
})