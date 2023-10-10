import Head from "next/head";
import { useEffect, useState } from "react"
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
import { ChapterLink } from "@/components/ChapterLink";
dayjs.extend(relativeTime)

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

function AddBookmarkBtn({
    bookmarkToAdd
}: {
    bookmarkToAdd: {
        novelSlug: string;
        novelTitle: string;
        chapterSlug: string;
        chapterTitle: string;
    }
}) {
    const addBookmarkMutation = useAddBookmark()
    const addBookmark = () => {
        addBookmarkMutation.mutate(bookmarkToAdd)
    }
    return (
        <button
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
            onClick={addBookmark}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 icon icon-tabler icon-tabler-bookmark" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
            </svg>

            Bookmark chapter
        </button>
    )
}

function createMarkup(markup: string) {
    return {
        __html: markup
    };
}

export default function Chapter() {
    const router = useRouter()
    const chapter = `${router.query.chapter}`
    const novel = `${router.query.novel}`
    const { data: user } = useUser()

    // getting novel's previous chapter
    const {
        data: dataPreviousChapter,
    } = useNovelPreviousChapter(novel, chapter)

    // getting novel's next chapter
    const {
        data: dataNextChapter,
    } = useNovelNextChapter(novel, chapter)

    // get chapter
    const {
        data: dataChapter,
    } = useNovelChapter(novel, chapter)

    //get novel
    const {
        data: dataNovel,
    } = useNovel(novel)

    const [enabled, setEnabled] = useState(false)
    let chaptersToRender

    // get novel chapters
    const {
        data: dataChapters,
        isLoading: isLoadingChapters,
        isError: isErrorChapters,
        error: errorChapters
    } = useNovelChapters(novel, enabled)

    if (dataChapters) {
        chaptersToRender =
            <div className="bg-gray-100 dark:bg-stone-800 rounded-b-xl">
                <div className="flex flex-col">
                    {dataChapters
                        .map(item => ({
                            novelSlug: novel,
                            ChapterSlug: item.slug,
                            title: item.title,
                            created_at: item.created_at.substring(0, 10)
                        }))
                        .map(item => (
                            <ChapterLink {...item} key={item.novelSlug} />
                        ))}
                </div>
            </div>
    }

    if (isLoadingChapters) {
        chaptersToRender = <Loading />
    }

    if (isErrorChapters) {
        chaptersToRender = <ServerError message={errorChapters?.message ?? "can't find resource"} />
    }

    const [sortComments, setSortComments] = useState<"new" | "old" | "top">("top")

    const addCommentProps = {
        chapter_id: dataChapter?.id ?? 0,
        chapterSlug: chapter
    }

    // getting a chapter's comments
    let commentsToRender

    const {
        data: dataComments,
        isLoading: isLoadingComments,
        isError: isErrorComments,
        error: errorComments,
        refetch: refetchComments,
        isRefetching: isRefetchingComments,
        isRefetchError: isRefetchErrorComments
    } = useChapterComments(chapter, sortComments)

    useEffect(() => {
        refetchComments();
    }, [refetchComments, sortComments]);

    if (dataComments) {
        commentsToRender = dataComments.length > 0
            ? dataComments.map(item => ({
                username: item.authorUsername,
                date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
                content: item.content,
                likes: item.likes,
                dislikes: item.dislikes,
                comment_id: item.id
            }))
                .map(item => (
                    <Comment {...item} key={item.comment_id} />
                ))
            : "No comments yet!"
    }

    if (isLoadingComments || isRefetchingComments) {
        commentsToRender = <Loading />
    }

    if (isErrorComments || isRefetchErrorComments) {
        commentsToRender = <ServerError message={errorComments?.message ?? "can't find resource"} />
    }

    // add bookmark
    const bookmarkToAdd = {
        novelSlug: `${novel}`,
        novelTitle: `${dataNovel?.title}`,
        chapterSlug: `${chapter}`,
        chapterTitle: `${dataChapter?.title}`,
    }

    return (
        <>
            <Head>
                <title>{`${dataNovel && dataNovel?.title} - ${dataChapter && dataChapter?.title}`}</title>
                <meta property="og:title" content={`${dataNovel && dataNovel?.title} - ${dataChapter && dataChapter?.title}`} key="title" />
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
                            <span className="font-semibold">{dataNovel && dataNovel?.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {
                                dataPreviousChapter
                                    ? <Link
                                        href={`../${novel}/${dataPreviousChapter.slug}`}
                                        className="rounded-full border border-blue-500 p-1 hover:shadow-xl"
                                    >
                                        <ChevronLeftIcon />
                                    </Link>
                                    : <button disabled className="rounded-full border p-1 text-gray-300">
                                        <ChevronLeftIcon />
                                    </button>
                            }
                            {
                                dataNextChapter
                                    ? <Link
                                        href={`../${novel}/${dataNextChapter.slug}`}
                                        className="rounded-full border border-blue-500 p-1 hover:shadow-xl"
                                    >
                                        <ChevronRightIcon />
                                    </Link>
                                    : <button disabled className="rounded-full border p-1 text-gray-300">
                                        <ChevronRightIcon />
                                    </button>
                            }
                            <ChaptersSlideOver chapters={chaptersToRender ?? <></>} setEnabled={setEnabled} novel={dataNovel?.title ?? ""} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-6xl m-auto">
                <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center max-w-4xl m-auto">
                <div className="w-full flex flex-col gap-4 items-start py-4 max-md:px-2">
                    <h1 className="text-2xl text-left text-gray-800 font-bold capitalize dark:text-gray-100">{dataChapter?.title ?? ""}</h1>
                    {/* markup */}
                    {
                        dataChapter
                            ? <div className="leading-normal" dangerouslySetInnerHTML={createMarkup(dataChapter?.content ?? "")} />
                            : <div className="self-center">
                                <Loading />
                            </div>
                    }
                    {user?.id && <AddBookmarkBtn bookmarkToAdd={bookmarkToAdd} />}
                    {dataNextChapter?.slug && <Link
                        href={`../${novel}/${dataNextChapter.slug}`}
                        className="self-center bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase rounded-full text-lg font-bold text-center py-4 w-48 my-4"
                    >
                        next chapter
                    </Link>}
                    {dataPreviousChapter?.slug && <Link
                        href={`../${novel}/${dataPreviousChapter.slug}`}
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
                    <span className="capitalize text-lg font-bold">{dataComments?.length ?? [].length} Comments</span>
                    <Popover className="relative">
                        {({ open }) => (
                            <>
                                <Popover.Button className="inline-flex justify-between items-center px-2 py-1 capitalize text-md rounded-md border dark:bg-stone-800 hover:shadow-md hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 outline-none">
                                    <span>{sortComments}</span>
                                    {
                                        open
                                            ? <CaretUpIcon />
                                            : <CaretDownIcon />
                                    }
                                </Popover.Button>

                                <Popover.Panel className="absolute z-10 right-0">
                                    <div className="flex flex-col py-2 shadow-md justify-start bg-white rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                                        <button onClick={() => setSortComments("top")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">top</button>
                                        <button onClick={() => setSortComments("new")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">new</button>
                                        <button onClick={() => setSortComments("old")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">old</button>
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
                <div className="flex flex-col items-start gap-5 max-md:px-2 w-full">
                    {commentsToRender}
                </div>
            </div>
            {/* <div className="flex justify-start items-center max-w-4xl my-8 mx-auto">
                <Pagination />
            </div> */}
        </>
    )
}