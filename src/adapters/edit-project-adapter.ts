import { z } from "zod";

export const EditProjectAdapter = z.object({
    projectId: z.coerce.number().int().transform((n) => Math.abs(n)),
    profileId: z.coerce.number().int().transform((n) => Math.abs(n))
})
