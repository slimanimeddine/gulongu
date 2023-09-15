import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@/types/signUpSchema";
import { useState } from "react";
import { TSignUpServerErrorsSchema } from "@/types/signUpServerErrors";
import { useRouter } from "next/navigation";
import { InputError } from "@/components/inputError";
import { useMutation } from "react-query";
import axios from "@/lib/axios";

export default function SignUp() {
    const router = useRouter()

    const [serverErrors, setServerErrors] = useState<TSignUpServerErrorsSchema>()

    const mutation = useMutation((props: TSignUpSchema) => {
        return axios
                .post('/register', props)
                .then()
                .catch(error => {
                    setServerErrors(error.response.data.errors)
                })
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
        await axios.get('/sanctum/csrf-cookie')
        mutation.mutate(data)
       
        if (serverErrors) {
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
        }
        reset()
        router.push("/login")
    }

    return (
        <>
            <Head>
                <title>Gulongu</title>
                <meta property="og:title" content="Gulongu" key="title" />
            </Head>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("username")}
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                <InputError
                                    error={errors.username}
                                    message={errors?.username?.message}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email")}
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                <InputError
                                    error={errors.email}
                                    message={errors?.email?.message}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("password")}
                                    type="password"
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                <InputError
                                    error={errors.password}
                                    message={errors?.password?.message}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm password
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("password_confirmation")}
                                    type="password"
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                <InputError
                                    error={errors.password_confirmation}
                                    message={errors?.password_confirmation?.message}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center w-full h-[36px] justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href={"/login"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}