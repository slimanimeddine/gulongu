import Head from "next/head";
import { Suspense, useState } from "react"
import { Popover } from '@headlessui/react'
import { CaretDownIcon, CaretUpIcon, /* ChevronRightIcon, ChevronLeftIcon, */ ArrowUp, ArrowDown, RemoveIcon } from "@/components/svgIcons";
import Link from "next/link";
import { useRedirect } from "@/hooks/useRedirect";
import { useUser } from "@/hooks/useUser";
import { useUserBookmarks } from "@/hooks/useUserBookmarks";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";

// function Pagination() {
//     return (
//         <div className="flex justify-start items-center gap-2 max-md:px-2">
//             <button
//                 className="border rounded-md cursor-auto text-gray-400 h-[32px] w-[32px] flex justify-center items-center"
//             >
//                 <ChevronLeftIcon />
//             </button>
//             <button
//                 className="h-[32px] w-[32px] flex justify-center items-center border border-sky-600 rounded-md"
//             >
//                 1
//             </button>
//             <button
//                 className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
//             >
//                 2
//             </button>
//             <button
//                 className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
//             >
//                 3
//             </button>
//             <button
//                 className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
//             >
//                 4
//             </button>
//             <button
//                 className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
//             >
//                 5
//             </button>
//             <span>...</span>
//             <button
//                 className="border rounded-md hover:bg-gray-100 h-[32px] w-[32px] flex justify-center items-center dark:hover:bg-stone-800"
//             >
//                 14
//             </button>
//             <button
//                 className="border rounded-md hover:bg-gray-100 h-[32px] w-[32px] flex justify-center items-center dark:hover:bg-stone-800"
//             >
//                 <ChevronRightIcon />
//             </button>
//         </div>
//     )
// }

export default function Bookmarks() {
    const [sort, setSort] = useState("last read")
    const [asc, setAsc] = useState(true)
    const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useUser()
    const { redirectTo } = useRedirect()

    if (!user?.id && !isLoadingUser && !isErrorUser) {
        redirectTo("/login")
    }

    let bookmarksToRender

    const {
        data,
        isLoading,
        isError,
        error
    } = useUserBookmarks()


    if (data?.bookmarks) {
        bookmarksToRender = data.bookmarks.map(item => (
            <tr key={item.id}>
                <td className="whitespace-normal px-4 py-2 font-semibold hover:underline">
                    <Link href={`/novel/${item.novelSlug}`}>
                        {item.novelTitle}
                    </Link>
                </td>
                <td className="whitespace-normal px-4 py-2 font-semibold hover:underline">
                    <Link href={`/novel/${item.novelSlug}/${item.chapterSlug}`}>
                        {item.chapterTitle}
                    </Link>
                </td>
                <td className="whitespace-normal px-4 py-2 font-semibold">
                    <button className="text-gray-600 hover:text-blue-500 dark:text-gray-100">
                        <RemoveIcon />
                    </button>
                </td>
            </tr>
        ))
    }

    if (isLoading) {
        bookmarksToRender = <Loading />
    }

    if (isError) {
        bookmarksToRender = <ServerError message={error?.message ?? "can't find resource"} />
    }

    return (
        <>
            <Head>
                <title>Bookmarks</title>
                <meta property="og:title" content="Bookmarks" key="title" />
            </Head>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="w-full flex flex-col gap-4 items-start py-4 max-md:px-2">
                    <h1 className="text-4xl text-left font-bold capitalize dark:text-gray-100 mt-2">bookmarks</h1>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="flex w-full justify-end items-center my-5 max-md:px-2">
                    <div className="flex justify-end items-center gap-1">
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button className="inline-flex justify-between items-center w-[160px] px-2 py-1 capitalize text-md rounded-md border dark:bg-stone-800 hover:shadow-md hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 outline-none">
                                        <span className="capitalize">{sort}</span>
                                        {
                                            open
                                                ? <CaretUpIcon />
                                                : <CaretDownIcon />
                                        }
                                    </Popover.Button>

                                    <Popover.Panel className="absolute z-10 right-0">
                                        <div className="flex flex-col py-2 shadow-md justify-start w-[160px] bg-white rounded-md overflow-auto border dark:bg-[#3B3B3B] dark:border-0">
                                            <button onClick={() => setSort("novel name")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">Novel Name</button>
                                            <button onClick={() => setSort("last read")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">Last Read</button>
                                            <button onClick={() => setSort("latest release")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">Latest Release</button>
                                        </div>
                                    </Popover.Panel>
                                </>
                            )}
                        </Popover>
                        <button
                            className="h-[35px] w-[36px] flex justify-center items-center border rounded-md hover:bg-gray-100 hover:shadow-md hover:border-sky-500  dark:hover:bg-stone-800"
                            onClick={() => setAsc(!asc)}
                        >
                            {
                                asc
                                    ? <ArrowUp />
                                    : <ArrowDown />
                            }
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-4xl mx-auto mb-10">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full divide-y-2 divide-gray-200text-sm overflow-hidden">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-normal px-4 py-2 font-bold text-left">
                                    Title
                                </th>
                                <th className="whitespace-normal px-4 py-2 font-bold text-left">
                                    Last Read
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            <Suspense fallback={"You haven't read any chapter yet!"}>
                                {bookmarksToRender}
                            </Suspense>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="flex justify-start items-center max-w-4xl my-8 mx-auto">
                <Pagination />
            </div> */}
        </>
    )
}