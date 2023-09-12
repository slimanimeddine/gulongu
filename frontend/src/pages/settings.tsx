import Head from "next/head";
import Link from "next/link";

export default function Settings() {
    return (
        <>
            <Head>
                <title>Settings</title>
                <meta property="og:title" content="settings" key="title" />
            </Head>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900 dark:text-gray-300">Account Settings</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* <div className="sm:col-span-4">
                        <label className="block font-bold text-xl leading-6 text-gray-900">
                            Change password
                        </label>
                        <div className="mt-4">
                            <div className="flex sm:max-w-md">
                                <Link href={"/changePassword"} className="hover:drop-shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full py-[4px] w-44 text-center">Change password</Link>
                            </div>
                        </div>
                    </div> */}

                    <div className="sm:col-span-4">
                        <label className="block text-xl font-bold leading-6 text-gray-900 dark:text-gray-300">
                            Delete my Gulongu account
                        </label>
                        <div className="mt-4">
                            <div className="flex flex-col sm:max-w-md gap-2">
                                <p>
                                    If you delete your account, you will lose access to all associated bookmarks and settings. Account deletion is irreversible.
                                </p>
                                <Link href={"/deleteAccount"} className="hover:drop-shadow-md bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full py-[4px] w-44 text-center">Delete account</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
