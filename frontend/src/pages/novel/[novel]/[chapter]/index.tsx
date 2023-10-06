import Head from "next/head";
import { useEffect, useRef, useState } from "react"
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
import { useNovelPreviousChapter } from "@/hooks/useNovelPreviousChapter";
import { useNovelNextChapter } from "@/hooks/useNovelNextChapter";
import { AddComment } from "@/components/addComment";
import { useUser } from "@/hooks/useUser";
import { useChapterComments } from "@/hooks/useChapterComments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { useAddBookmark } from "@/hooks/useAddBookmark";
dayjs.extend(relativeTime)

function Alert() {
    return (
        <div className="flex items-center p-4 my-2 w-full text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 icon icon-tabler icon-tabler-circle-check" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                        <path d="M9 12l2 2l4 -4"></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-bold">Chapter marked as read!</span>
                    </div>
                </div>
                <button className="dark:text-white font-bold">Undo</button>
            </div>
        </div>
    )
}

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

function createMarkup(markup: string) {
    return {
        __html: markup
    };
}

export default function Chapter() {
    const router = useRouter()
    const { chapter, novel } = router.query
    const { data: user } = useUser()

    // getting novel's previous chapter
    const {
        data: dataPreviousChapter,
    } = useNovelPreviousChapter(`${novel}`, `${chapter}`)

    // getting novel's next chapter
    const {
        data: dataNextChapter,
    } = useNovelNextChapter(`${novel}`, `${chapter}`)

    // get chapter
    const {
        data: dataChapter,
    } = useNovelChapter(`${novel}`, `${chapter}`)

    //get novel
    const {
        data: dataNovel,
    } = useNovel(`${novel}`)

    const [enabled, setEnabled] = useState(false)
    let chapters

    // get novel chapters
    const {
        data: dataChapters,
        isLoading: isLoadingChapters,
        isError: isErrorChapters,
        error: errorChapters
    } = useNovelChapters(`${novel}`, enabled)

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
                            <span className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-200 pl-3">{item.title}</span>
                            <span className="text-sm text-gray-400 dark:text-gray-300 pl-3">{item.created_at}</span>
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

    const [sort, setSort] = useState<"new" | "old" | "top">("top")

    const addCommentProps = {
        chapter_id: dataChapter?.chapter?.id as number,
        chapterSlug: chapter as string,
    }

    // getting a chapter's comments
    let commentsToRender

    const {
        data: dataComments,
        isLoading: isLoadingComments,
        isError: isErrorComments,
        error: errorComments
    } = useChapterComments(`${chapter}`, sort)

    if (dataComments?.comments) {
        const commentsArr = dataComments.comments.map(item => ({
            username: item.authorUsername,
            date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
            content: item.content,
            likes: item.likes,
            dislikes: item.dislikes,
            comment_id: item.id
        }))

        commentsToRender = commentsArr.map(item => (
            <Comment {...item} key={item.comment_id} />
        ))
    }

    if (isLoadingComments) {
        commentsToRender = <Loading />
    }

    if (isErrorComments) {
        commentsToRender = <ServerError message={errorComments?.message ?? "can't find resource"} />
    }

    // tracking progress
    const chapterRef = useRef<HTMLDivElement | null>(null)
    const bookmarkToAdd = {
        novelSlug: `${novel}`,
        novelTitle: `${dataNovel?.novel?.title}` ,
        chapterSlug: `${chapter}`,
        chapterTitle: `${dataChapter?.chapter?.title}`,
    }
    const obj = useAddBookmark(bookmarkToAdd)

    useEffect(() => {
        function handleScroll() {
            if (chapterRef.current) {
                const scrollPosition = window.scrollY
                const chapterOffsetTop = chapterRef.current.offsetTop
                const chapterHeight = chapterRef.current.offsetHeight

                // Calculate the threshold based on chapter height and offsetTop
                const threshold = chapterOffsetTop + chapterHeight * 0.75

                if (scrollPosition >= threshold) {
                    obj.addBookmarkMutation.mutate()
                }
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])



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
                            {
                                dataPreviousChapter?.previousChapter
                                    ? <Link
                                        href={`../${novel}/${dataPreviousChapter.previousChapter.slug}`}
                                        className="rounded-full border border-blue-500 p-1 hover:shadow-xl"
                                    >
                                        <ChevronLeftIcon />
                                    </Link>
                                    : <button disabled className="rounded-full border p-1 text-gray-300">
                                        <ChevronLeftIcon />
                                    </button>
                            }
                            {
                                dataNextChapter?.nextChapter
                                    ? <Link
                                        href={`../${novel}/${dataNextChapter.nextChapter.slug}`}
                                        className="rounded-full border border-blue-500 p-1 hover:shadow-xl"
                                    >
                                        <ChevronRightIcon />
                                    </Link>
                                    : <button disabled className="rounded-full border p-1 text-gray-300">
                                        <ChevronRightIcon />
                                    </button>
                            }
                            <ChaptersSlideOver chapters={chapters ?? <></>} setEnabled={setEnabled} novel={dataNovel?.novel.title ?? ""} />
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
                    {
                        dataChapter?.chapter
                            ? <div ref={chapterRef} className="leading-normal" dangerouslySetInnerHTML={createMarkup(dataChapter?.chapter.content ?? "")} />
                            : <div className="self-center">
                                <Loading />
                            </div>
                    }
                    {/* alert */}
                    {obj.added && !!user?.id && <Alert />}
                    {dataNextChapter?.nextChapter.slug && <Link
                        href={`../${novel}/${dataNextChapter.nextChapter.slug}`}
                        className="self-center bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase rounded-full text-lg font-bold text-center py-4 w-48 my-4"
                    >
                        next chapter
                    </Link>}
                    {dataPreviousChapter?.previousChapter.slug && <Link
                        href={`../${novel}/${dataPreviousChapter.previousChapter.slug}`}
                        className="self-center text-gray-500 uppercase text-sm text-center underline font-medium"
                    >
                        previous chapter
                    </Link>}

                </div>
            </div>
            <div className="flex justify-center items-center max-w-6xl m-auto">
                <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="flex w-full justify-between items-center my-5 max-md:px-2">
                    <span className="capitalize text-lg font-bold">{dataComments?.comments.length ?? [].length} Comments</span>
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
            <div className="flex justify-center items-center max-w-4xl mx-auto mb-5">
                {user?.id && <AddComment {...addCommentProps} />}
            </div>
            <div className="flex justify-center items-center max-w-4xl mx-auto mb-5">
                <div className="flex flex-col items-start gap-5 max-md:px-2">
                    {commentsToRender}
                </div>
            </div>
            {/* <div className="flex justify-start items-center max-w-4xl my-8 mx-auto">
                <Pagination />
            </div> */}
        </>
    )
}