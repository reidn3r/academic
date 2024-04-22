import { z } from 'zod';

export const SearchAdapter = z.object({
    nameInput: z.string().nullable(),
    courseInput: z.string().nullable(),
    gradInput: z.string().nullable(),
    universityInput: z.string().nullable(),
    cityInput: z.string().nullable(),
    stateInput: z.string().nullable(),
    topicInput: z.string().nullable(),
})