import { z } from "zod"

export const signUpServerErrorsSchema = z.object({
    username: z.string().array().optional(),
    email: z.string().array().optional(),
    password: z.string().array().optional(),
    password_confirmation: z.string().array().optional()
})

export type TSignUpServerErrorsSchema = z.infer<typeof signUpServerErrorsSchema>