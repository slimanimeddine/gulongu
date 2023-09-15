import { z } from "zod"

export const logInServerErrorsSchema = z.object({
    email: z.string().array().optional(),
    password: z.string().array().optional(),
})

export type TLogInServerErrorsSchema = z.infer<typeof logInServerErrorsSchema>