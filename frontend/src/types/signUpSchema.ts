import { z } from "zod"

export const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"]
})

export type TSignUpSchema = z.infer<typeof signUpSchema>