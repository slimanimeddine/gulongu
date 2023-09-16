import axios from "@/lib/axios"
import { TSignUpSchema, signUpSchema } from "@/types/signUpSchema";
import { TSignUpServerErrorsSchema } from "@/types/signUpServerErrors";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { csrf } from "@/lib/csrf";
import { useRedirect } from "./useRedirect";

interface IUseSignUp {
    serverErrors: TSignUpServerErrorsSchema,
    setServerErrors: React.Dispatch<React.SetStateAction<TSignUpServerErrorsSchema>>
}

export const useSignUp = ({
    serverErrors,
    setServerErrors
}: IUseSignUp) => {
    const { redirectTo } = useRedirect()
    const signUpMutation = useMutation({
        mutationFn: (props: TSignUpSchema) => {
            return axios
                .post('/register', props)
                .then()
                .catch(error => {
                    setServerErrors(error.response.data.errors)
                })
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
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (data: TSignUpSchema) => {
        await csrf()
        signUpMutation.mutate(data)

        if (serverErrors?.username || serverErrors?.email || serverErrors?.password || serverErrors?.password_confirmation) {
            if (serverErrors.username) {
                setError("username", {
                    type: "server",
                    message: serverErrors.username[0]
                });
            }
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
            if (serverErrors.password_confirmation) {
                setError("password_confirmation", {
                    type: "server",
                    message: serverErrors.password_confirmation[0]
                });
            }
        } else {
            reset()
            redirectTo('/login')
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