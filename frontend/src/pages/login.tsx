import Link from "next/link";
import Head from "next/head";
import { InputError } from "@/components/inputError";
import { useUser } from "@/hooks/useUser";
import { useRedirect } from "@/hooks/useRedirect";
import { useLogin } from "@/hooks/useLogIn";
import { TLogInServerErrorsSchema } from "@/types/logInServerErrors";
import { useState } from "react";

export default function Login() {
    const { data: user } = useUser()
    const { redirectTo } = useRedirect()
    const [serverErrors, setServerErrors] = useState<TLogInServerErrorsSchema>({})

    if (user?.id) {
        redirectTo("/")
    }

    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    } = useLogin({
        serverErrors,
        setServerErrors
    })

    return (
        <>
            <Head>
                <title>Gulongu</title>
                <meta property="og:title" content="Gulongu" key="title" />
            </Head>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log in
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <Link href="" className="font-semibold text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </Link>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    {...register("password")}
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                <InputError
                                    error={errors.password}
                                    message={errors?.password?.message}
                                />
                            </div>
                        </div>
                        <div className="text-sm">
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Log in
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-10 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href={"/signup"} className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}