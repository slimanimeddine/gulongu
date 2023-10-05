import Head from "next/head";
import { useState } from "react"
import { Tab, Popover, Disclosure } from '@headlessui/react'
import { NovelInfos } from "@/components/novelInfos";
import { Review, type ReviewProps, ReviewsModal } from "@/components/review";
import { BigThumbUpIcon, CaretDownIcon, CaretUpIcon, ChevronDownIcon, ChevronUpIcon } from "@/components/svgIcons";
import { useNovel } from "@/hooks/useNovel";
import { useRouter } from "next/router";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";
import { useNovelChapters } from "@/hooks/useNovelChapters";
import Link from "next/link";
import { useNovelFirstChapter } from "@/hooks/useNovelFirstChapter";
import { useNovelReviews } from "@/hooks/useNovelReviews";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import { AddReview } from "@/components/addReview";
import { useUser } from "@/hooks/useUser";
import { classNames } from "@/helpers/classNames";

export default function Novel() {
    const [sort, setSort] = useState<"newest" | "oldest">("newest")
    const [sortReviews, setSortReviews] = useState<"newest" | "oldest">("newest")

    const [enabled, setEnabled] = useState(false)
    const router = useRouter()
    const slug = `${router.query.novel}`
    const { data: user } = useUser()

    let novelInfosCard
    let reviewsArr

    // getting novel data
    const {
        data: dataNovel,
        isLoading: isLoadingNovel,
        isError: isErrorNovel,
        error: errorNovel
    } = useNovel(slug)

    // getting novel's reviews
    const {
        data: dataReviews,
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        error: errorReviews
    } = useNovelReviews(slug, sortReviews)

    let reviewsToRender

    if (dataReviews?.reviews) {
        reviewsArr = dataReviews.reviews.map(item => ({
            reviewId: item.id,
            username: item.authorUsername,
            date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
            rating: item.isRecommended === 1 ? "recommended" : "not recommended",
            content: item.content,
            likes: item.likes,
            dislikes: item.dislikes,
            replies: item.numberOfReplies,
            user_id: user?.id as number
        }))

        reviewsToRender = reviewsArr.slice(0, 3).map((item) => (
            <Review {...item} key={item.reviewId} />
        ))
    }

    if (isLoadingReviews) {
        reviewsArr = []
        reviewsToRender = <Loading />
    }

    if (isErrorReviews) {
        reviewsArr = []
        reviewsToRender = <ServerError message={errorReviews?.message ?? "can't find resource"} />
    }

    // getting novel's first chapter
    const {
        data: dataFirstChapter,
    } = useNovelFirstChapter(slug)

    // getting novel's chapters
    const {
        data: dataChapters,
        isLoading: isLoadingChapters,
        isError: isErrorChapters,
        error: errorChapters
    } = useNovelChapters(slug, enabled)

    if (dataNovel?.novel) {
        const novelData = {
            title: dataNovel.novel.title,
            author: "gu long",
            translator: dataNovel.novel.translator,
            synopsis: dataNovel.novel.synopsis,
            nbReviews: dataReviews?.reviews.length as number,
            percLikes: Math.floor(((dataReviews?.reviews.filter(item => item.isRecommended === 1).length as number) / (dataReviews?.reviews.length as number)) * 100),
            novelSlug: slug,
            reviews: reviewsArr as ReviewProps[],
            firstChapterUrl: `${slug}/${dataFirstChapter?.firstChapter?.slug ?? ""}`,
            viewAll: false,
            sort: sortReviews,
            setSort: setSortReviews
        }
        novelInfosCard = <NovelInfos {...novelData} />
    }

    if (isLoadingNovel) {
        novelInfosCard = <Loading />
    }

    if (isErrorNovel) {
        novelInfosCard = <ServerError message={errorNovel?.message ?? "can't find resource"} />
    }

    let chapters: JSX.Element

    if (dataChapters?.chapters) {
        chapters =
            <div className="bg-gray-100 dark:bg-stone-800 rounded-b-xl">
                <div className="px-8 py-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                    {dataChapters.chapters.map(item => (
                        <Link
                            href={`${slug}/${item.slug}`}
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

    const addReviewProps = {
        novel_id: dataNovel?.novel?.id as number,
        novelSlug: dataNovel?.novel?.slug as string,
        novelTitle: dataNovel?.novel?.title as string
    }

    return (
        <>
            <Head>
                <title>{`${dataNovel?.novel?.title ?? ""} | Gulongu`}</title>
                <meta property="og:title" content={`${dataNovel?.novel?.title ?? ""} | Gulongu`} key="title" />
            </Head>
            <div className="flex justify-center items-center bg-zinc-100 dark:bg-stone-800">
                {novelInfosCard}
            </div>
            <Tab.Group>
                <Tab.List className="max-w-4xl flex justify-start mx-auto">
                    <div className="flex justify-start items-center gap-10 outline-none pt-5">
                        <Tab className={({ selected }) => classNames("text-xl font-semibold pb-1 outline-none",
                            selected && "border-b-4 border-blue-500"
                        )}>
                            <span className="px-4">About</span>
                        </Tab>
                        <Tab className={({ selected }) => classNames("text-xl font-semibold pb-1 outline-none",
                            selected && "border-b-4 border-blue-500"
                        )}>
                            <span className="px-4">Chapters</span>
                        </Tab>
                    </div>
                </Tab.List>
                <hr />
                <Tab.Panels>
                    <Tab.Panel className="mx-4">
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5 border-b border-stone-300">
                            <div className="flex justify-start gap-20 text-gray-600 capitalize dark:text-stone-200">
                                <div className="flex flex-col">
                                    <span>chapters</span>
                                    <strong>{dataNovel?.novel?.numberOfChapters} chapters</strong>
                                </div>
                                <div className="flex flex-col">
                                    <span>licensed from</span>
                                    <strong>unknown</strong>
                                </div>
                            </div>
                            <div className="flex justify-start gap-1 flex-wrap">
                                {
                                    dataNovel?.novel?.genres.map(item => (
                                        <div key={item} className="px-4 py-1 capitalize text-sm font-medium rounded-md border  hover:text-sky-500 hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 dark:hover:text-sky-500">{item}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5 border-b border-stone-300">
                            <div className="text-start text-xl font-semibold outline-none capitalize dark:text-stone-200">
                                Details
                            </div>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Written by Gu Long</p>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Translated by: {dataNovel?.novel?.translator}</p>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Edited by: unknown</p>
                        </div>
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5">
                            <div className="text-start text-xl font-semibold outline-none capitalize dark:text-stone-200">
                                Reviews
                            </div>
                            {user?.id && <AddReview {...addReviewProps} />}
                            <div className="flex w-full justify-between items-center">
                                <div className="inline-flex items-end capitalize font-medium text-3xl">
                                    <BigThumbUpIcon series={true} />
                                    <span className="font-bold">{dataReviews && Math.floor((dataReviews?.reviews.filter(item => item.isRecommended === 1).length / dataReviews?.reviews.length) * 100)} %</span>
                                    <span className="capitalize text-gray-600 text-xl ml-2 font-bold dark:text-stone-200">{dataReviews?.reviews.length} reviews</span>
                                </div>
                                <ReviewsModal {...{
                                    viewAll: true,
                                    nbReviews: dataReviews?.reviews.length as number,
                                    percLikes: Math.floor(((dataReviews?.reviews.filter(item => item.isRecommended === 1).length as number) / (dataReviews?.reviews.length as number)) * 100),
                                    reviews: reviewsArr as ReviewProps[],
                                    novelSlug: slug,
                                    sort: sortReviews,
                                    setSort: setSortReviews                        
                                }} />
                            </div>
                            {reviewsToRender}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="mx-4">
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5">
                            <div className="flex w-full justify-between items-center">
                                <div className="flex flex-col">
                                    {/* <span className="capitalize text-gray-600 font-medium dark:text-gray-200">latest chapter</span>
                                    <div className="inline-flex items-center gap-1">
                                        <span className="capitalize text-lg font-bold">chapter 245</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-200">a year ago</span>
                                    </div> */}
                                    <div></div>
                                </div>
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button className="inline-flex justify-between items-center px-2 py-1 capitalize text-sm font-bold rounded-md border bg-gray-100 dark:bg-stone-800 hover:shadow-md hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 outline-none">
                                                <span>{sort}</span>
                                                {
                                                    open
                                                        ? <CaretUpIcon />
                                                        : <CaretDownIcon />
                                                }
                                            </Popover.Button>

                                            <Popover.Panel className="absolute z-10 right-0">
                                                <div className="flex flex-col py-2 shadow-md justify-start bg-white w-44 rounded-md overflow-auto max-h-40 border dark:bg-[#3B3B3B] dark:border-0">
                                                    <button onClick={() => {
                                                        setSort("newest")
                                                    }} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">newest</button>
                                                    <button onClick={() => {
                                                        setSort("oldest")
                                                    }} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">oldest</button>
                                                </div>
                                            </Popover.Panel>
                                        </>
                                    )}
                                </Popover>
                            </div>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <div className="w-full shadow-md shadow-slate-300 rounded-xl border dark:shadow-none dark:border-none dark:bg-stone-800">
                                            <Disclosure.Button
                                                className="flex justify-between items-center w-full gap-3 p-4"
                                                onClick={() => setEnabled(!open)}
                                            >
                                                <div className="flex items-center gap-2 text-lg font-semibold capitalize">
                                                    <span className="bg-gray-200 rounded-md py-1 px-3 dark:bg-stone-700">1</span>
                                                    <span>chapters</span>
                                                </div>
                                                {
                                                    open
                                                        ? <ChevronUpIcon />
                                                        : <ChevronDownIcon />
                                                }
                                            </Disclosure.Button>
                                            <Disclosure.Panel>
                                                {chapters}
                                            </Disclosure.Panel>
                                        </div>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </>
    )
}