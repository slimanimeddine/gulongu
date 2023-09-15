import { z } from "zod"

export const userSchema = z.object({
    email: z.string().email(),
    id: z.number(),
    username: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    email_verified_at: z.string().optional(),
})

export type TUserSchema = z.infer<typeof userSchema>