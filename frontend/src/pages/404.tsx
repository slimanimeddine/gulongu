import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
    return (
        <div
            className="flex justify-center items-center py-40 w-full h-full object-cover object-[center_top]"
        >
            <Head>
                <title>404 Page not found</title>
                <meta property="og:title" content="Gulongu | Read Gulong's novels" key="title" />
            </Head>
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-7xl">404</h1>
                <p className="text-lg font-medium text-center">This page either does not exist or has mysteriously disappeared.</p>
                <p className=" text-md mb-4 text-center">Perhaps the page has ascended to a new world?</p>
                <Link href="/">
                    <button className="hover:drop-shadow-md font-semibold bg-gradient-to-r from-blue-500 to-blue-700 text-white capitalize rounded-full py-[4px] w-44 my-4 mx-4">back to home</button>
                </Link>
            </div>
        </div>
    )
}