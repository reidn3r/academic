import { z } from 'zod';

export const GetProfileAdapater = z.object({
    id: z.coerce.number().int().transform(id => Math.abs(id))
});