import Head from "next/head";
import { useState } from "react"
import { Popover } from '@headlessui/react'
import { Comment } from "@/components/comment";
import { useRouter } from 'next/router'
import { BigChevronLeftIcon, CaretDownIcon, CaretUpIcon, ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@/components/svgIcons";
import ChaptersSlideOver from "@/components/chaptersSlideOver";
import { useNovelChapter } from "@/hooks/useNovelChapter";
import { useNovel } from "@/hooks/useNovel";
import Link from "next/link";
import { useNovelChapters } from "@/hooks/useNovelChapters";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";

function Pagination() {
    return (
        <div className="flex justify-start items-center gap-2 max-md:px-2">
            <button
                className="border rounded-md cursor-auto text-gray-400 h-[32px] w-[32px] flex justify-center items-center"
            >
                <ChevronLeftIcon />
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border border-sky-600 rounded-md"
            >
                1
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                2
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                3
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                4
            </button>
            <button
                className="h-[32px] w-[32px] flex justify-center items-center border rounded-md hover:bg-gray-100 dark:hover:bg-stone-800"
            >
                5
            </button>
            <span>...</span>
            <button
                className="border rounded-md hover:bg-gray-100 h-[32px] w-[32px] flex justify-center items-center dark:hover:bg-stone-800"
            >
                14
            </button>
            <button
                className="border rounded-md hover:bg-gray-100 h-[32px] w-[32px] flex justify-center items-center dark:hover:bg-stone-800"
            >
                <ChevronRightIcon />
            </button>
        </div>
    )
}

function createMarkup(markup: string) {
    return {
        __html: markup
    };
}

export default function Chapter() {
    const router = useRouter()
    const { chapter, novel } = router.query
    const {
        data: dataChapter,
    } = useNovelChapter(`${novel}`, `${chapter}`)

    const {
        data: dataNovel,
    } = useNovel(`${novel}`)
    // get novel chapters
    let chapters

    const {
        data: dataChapters,
        isLoading: isLoadingChapters,
        isError: isErrorChapters,
        error: errorChapters
    } = useNovelChapters(`${novel}`)

    if (dataChapters?.chapters) {
        chapters =
            <div className="bg-gray-100 dark:bg-stone-800 rounded-b-xl">
                <div className="flex flex-col">
                    {dataChapters.chapters.map(item => (
                        <Link
                            href={`../${novel}/${item.slug}`}
                            className="flex flex-col border-b border-gray-400 pb-2 hover:bg-gray-200 dark:hover:bg-stone-700"
                            key={item.id}
                        >
                            <span className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">{item.title}</span>
                            <span className="text-sm text-gray-400 dark:text-gray-300">{item.created_at}</span>
                        </Link>
                    ))}

                </div>
            </div>
    }

    if (isLoadingChapters) {
        chapters = <Loading />
    }

    if (isErrorChapters) {
        chapters = <ServerError message={errorChapters?.message ?? "can't find resource"} />
    }

    const [sort, setSort] = useState("top")
    const comment = {
        username: "slimanimeddine",
        date: "5 years ago",
        content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte",
        likes: 55,
        dislikes: 12,
        commentReplies: [
            {
                username: "slimanimeddine",
                date: "5 years ago",
                content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte",
                likes: 55,
                dislikes: 12,
            },
            {
                username: "slimanimeddine",
                date: "5 years ago",
                content: "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte",
                likes: 55,
                dislikes: 12,
            },
        ]
    }

    const comments = Array(10).fill(comment)

    return (
        <>
            <Head>
                <title>{`${dataNovel?.novel.title ?? ""} - ${dataChapter?.chapter.title ?? ""}`}</title>
                <meta property="og:title" content={`${dataNovel?.novel.title ?? ""} - ${dataChapter?.chapter.title ?? ""}`} key="title" />
            </Head>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="w-full py-3">
                    <div className="flex justify-between items-center max-md:px-2">
                        <div className="flex items-center gap-1">
                            <Link
                                href={`../${novel}`}
                            >
                                <BigChevronLeftIcon />
                            </Link>
                            <div className="border border-black rounded-lg">
                                <PhotoIcon width={29} height={40} />
                            </div>
                            <span className="font-semibold">{dataNovel?.novel.title ?? ""}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled className="rounded-full border p-1 text-gray-300">
                                <ChevronLeftIcon />
                            </button>
                            <button className="rounded-full border border-blue-500 p-1 hover:shadow-xl">
                                <ChevronRightIcon />
                            </button>
                            <ChaptersSlideOver chapters={chapters ?? <></>} novel={dataNovel?.novel.title ?? ""} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-6xl m-auto">
                <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="w-full flex flex-col gap-4 items-start py-4 max-md:px-2">
                    <h1 className="text-2xl text-left text-gray-800 font-bold capitalize dark:text-gray-100">{dataChapter?.chapter.title ?? ""}</h1>
                    {/* markup */}
                    <div className="leading-loose" dangerouslySetInnerHTML={createMarkup(dataChapter?.chapter.content ?? "")} />
                    <button className="self-center bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase rounded-full text-lg font-bold text-center py-4 w-48 my-4">next chapter</button>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-6xl m-auto">
                <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="flex w-full justify-between items-center my-5 max-md:px-2">
                    <span className="capitalize text-lg font-bold">1,556 Comments</span>
                    <Popover className="relative">
                        {({ open }) => (
                            <>
                                <Popover.Button className="inline-flex justify-between items-center px-2 py-1 capitalize text-md rounded-md border dark:bg-stone-800 hover:shadow-md hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 outline-none">
                                    <span>{sort}</span>
                                    {
                                        open
                                            ? <CaretUpIcon />
                                            : <CaretDownIcon />
                                    }
                                </Popover.Button>

                                <Popover.Panel className="absolute z-10 right-0">
                                    <div className="flex flex-col py-2 shadow-md justify-start bg-white rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                                        <button onClick={() => setSort("top")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">top</button>
                                        <button onClick={() => setSort("new")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">new</button>
                                        <button onClick={() => setSort("old")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">old</button>
                                    </div>
                                </Popover.Panel>
                            </>
                        )}
                    </Popover>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="flex flex-col items-start gap-5 max-md:px-2">
                    {comments.map((item, i) => (
                        <Comment {...item} key={i} />
                    ))}
                </div>
            </div>
            <div className="flex justify-start items-center max-w-4xl my-8 mx-auto">
                <Pagination />
            </div>
        </>
    )
}