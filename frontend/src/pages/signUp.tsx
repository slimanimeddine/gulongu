import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/svgIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@/types/signUpSchema";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";
import { TSignUpServerErrorsSchema } from "@/types/signUpServerErrors";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter()

    const [serverErrors, setServerErrors] = useState<TSignUpServerErrorsSchema>()

    const { register: signUp } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
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
        signUp({
            props: data,
            setErrors: setServerErrors
        })
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
        router.push("/")
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
                                {errors.username && (
                                    <p className="mt-1 text-red-600 text-sm">
                                        {`${errors.username.message}`}
                                    </p>
                                )}
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
                                {errors.email && (
                                    <p className="mt-1 text-red-600 text-sm">
                                        {`${errors.email.message}`}
                                    </p>
                                )}
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
                                {errors.password && (
                                    <p className="mt-1 text-red-600 text-sm">
                                        {`${errors.password.message}`}
                                    </p>
                                )}
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
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-red-600 text-sm">
                                        {`${errors.password_confirmation.message}`}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center w-full h-[36px] justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                {isSubmitting ? <LoadingSpinner width={20} height={20} /> : "Sign up"}
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