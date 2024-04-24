import { z } from 'zod';

export const DeleteProjectAdapter = z.object({
    projectId: z.coerce.number().int().min(1)
})