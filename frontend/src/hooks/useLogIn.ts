import axios from "@/lib/axios"
import { TLogInSchema, logInSchema } from "@/types/logInSchema"
import { TLogInServerErrorsSchema } from "@/types/logInServerErrors"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { useRedirect } from "./useRedirect"
import { csrf } from "@/lib/csrf"

interface IUseLogin {
    serverErrors: TLogInServerErrorsSchema,
    setServerErrors: React.Dispatch<React.SetStateAction<TLogInServerErrorsSchema>>
}

export const useLogin = ({
    serverErrors,
    setServerErrors
}: IUseLogin) => {
    const { redirectTo } = useRedirect()
    const queryClient = useQueryClient()
    
    const logInMutation = useMutation({
        mutationFn: (props: TLogInSchema) => {
            return axios
                .post('/login', props)
                .then()
                .catch(error => {
                    setServerErrors(error.response.data.errors)
                })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        },
        reset,
        setError,
    } = useForm<TLogInSchema>({
        resolver: zodResolver(logInSchema)
    })

    const onSubmit = async (data: TLogInSchema) => {
        await csrf()
        logInMutation.mutate(data)

        if (serverErrors) {
            if (serverErrors.email) {
                setError("email", {
                    type: "server",
                    message: serverErrors.email[0]
                });
            }
            if (serverErrors.password) {
                setError("password", {
                    type: "server",
                    message: serverErrors.password[0]
                });
            }
        } else {
            reset()
            redirectTo("/")
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    }
}