import { NovelInfos } from "@/components/novelInfos";
import { Review, ReviewsModal } from "@/components/review";
import { useNovel } from "@/hooks/useNovel";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
import { AddReview } from "@/components/addReview";
import { useUser } from "@/hooks/useUser";
import { JSX, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, useEffect, useState } from "react";
import { ChapterLink } from "@/components/ChapterLink";
import { BigThumbUpIcon, ChevronUpIcon, ChevronDownIcon } from "@/components/svgIcons";
import { classNames } from "@/helpers/classNames";
import { Tab, Disclosure } from "@headlessui/react";
import { Loading } from "@/components/loading";
import { ServerError } from "@/components/serverError";
import Head from "next/head";
import { useNovelReviews } from "@/hooks/useNovelReviews";
import { useNovelChapters } from "@/hooks/useNovelChapters";

export default function Novel() {
    const [, setEnabled] = useState(false)
    const router = useRouter()
    const slug = `${router.query.novel}`
    const { data: user } = useUser()
    const [sortReviews, setSortReviews] = useState<"newest" | "oldest" | "worst" | "best">("newest")

    let reviewsToRender
    let chaptersToRender: string | number | boolean | JSX.Element[] | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined
    let novel
    let novelInfosCard
    let addReviewProps
    let reviewsModalProps
    let reviewsModal
    let addReview

    // getting novel's reviews
    const {
        data: dataReviews,
        isLoading: isLoadingReviews,
        isError: isErrorReviews,
        error: errorReviews,
        refetch: refetchReviews,
        isRefetching: isRefetchingReviews,
        isRefetchError: isRefetchErrorReviews
    } = useNovelReviews(slug, sortReviews)

    useEffect(() => {
        refetchReviews();
    }, [refetchReviews, sortReviews]);

    if (dataReviews) {
        reviewsToRender = dataReviews
            .map(item => ({
                reviewId: item.id,
                username: item.authorUsername,
                date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
                rating: item.isRecommended === 1 ? "recommended" : "not recommended",
                content: item.content,
                likes: item.likes,
                dislikes: item.dislikes,
                replies: item.numberOfReplies,
                user_id: user?.id as number,
                novelSlug: slug
            }))
            .slice(0, 3).map(item => (
                <Review {...item} key={item.reviewId} />
            ))
    }

    if (isLoadingReviews || isRefetchingReviews) {
        reviewsToRender = <Loading />
        reviewsModal = <Loading />
    }

    if (isErrorReviews || isRefetchErrorReviews) {
        reviewsToRender = <ServerError message={errorReviews?.message ?? "can't find resource"} />
        reviewsModal = <ServerError message={errorReviews?.message ?? "can't find resource"} />
    }

    // getting novel's chapters
    const {
        data: dataChapters,
        isLoading: isLoadingChapters,
        isError: isErrorChapters,
        error: errorChapters,
    } = useNovelChapters(slug, true)

    if (dataChapters) {
        chaptersToRender = dataChapters
            .map(item => ({
                novelSlug: slug,
                ChapterSlug: item.slug,
                title: item.title,
                created_at: item.created_at.substring(0, 10)
            }))
            .map(item => (
                <ChapterLink {...item} key={item.novelSlug} />
            ))
    }

    if (isLoadingChapters) {
        chaptersToRender = <Loading />
    }

    if (isErrorChapters) {
        chaptersToRender = <ServerError message={errorChapters?.message ?? "can't find resource"} />
    }

    // getting novel data
    const {
        data: dataNovel,
        isLoading: isLoadingNovel,
        isError: isErrorNovel,
        error: errorNovel
    } = useNovel(slug)

    if (dataNovel && dataReviews && dataChapters) {
        novel = {
            title: dataNovel?.title,
            author: "gu long",
            translator: dataNovel?.translator,
            synopsis: dataNovel?.synopsis,
            nbReviews: dataNovel?.totalReviews,
            percLikes: Math.floor(dataNovel?.recommendationRatio * 100),
            reviews: dataReviews.map(item => ({
                reviewId: item.id,
                username: item.authorUsername,
                date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
                rating: item.isRecommended === 1 ? "recommended" : "not recommended",
                content: item.content,
                likes: item.likes,
                dislikes: item.dislikes,
                replies: item.numberOfReplies,
                user_id: user?.id as number,
                novelSlug: slug
            })),
            firstChapterUrl: `${slug}/${dataChapters.at(0)?.slug}`,
            viewAll: false,
            sortReviews,
            setSortReviews,
        }

        novelInfosCard = <NovelInfos {...novel} />

        // add review props
        addReviewProps = {
            novel_id: dataNovel?.id,
            novelSlug: dataNovel?.slug,
            novelTitle: dataNovel?.title
        }

        addReview = <AddReview {...addReviewProps} />

        // reviews modal props
        reviewsModalProps = {
            viewAll: true,
            nbReviews: dataNovel?.totalReviews,
            percLikes: Math.floor(dataNovel?.recommendationRatio * 100),
            reviews: dataReviews.map(item => ({
                reviewId: item.id,
                username: item.authorUsername,
                date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
                rating: item.isRecommended === 1 ? "recommended" : "not recommended",
                content: item.content,
                likes: item.likes,
                dislikes: item.dislikes,
                replies: item.numberOfReplies,
                user_id: user?.id as number,
                novelSlug: slug
            })),
            sortReviews,
            setSortReviews,
        }

        reviewsModal = <ReviewsModal {...reviewsModalProps} />
    }

    if (isLoadingNovel) {
        novelInfosCard = <Loading />
        addReview = <Loading />
        reviewsModal = <Loading />
    }

    if (isErrorNovel) {
        novelInfosCard = <ServerError message={errorNovel?.message ?? "can't find resource"} />
        addReview = <ServerError message={errorNovel?.message ?? "can't find resource"} />
        reviewsModal = <ServerError message={errorNovel?.message ?? "can't find resource"} />
    }

    //////////////////////////////////

    return (
        <>
            <Head>
                <title>{`${dataNovel && dataNovel?.title} | Gulongu`}</title>
                <meta property="og:title" content={`${dataNovel && dataNovel?.title} | Gulongu`} key="title" />
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
                                    <strong>{dataNovel && dataNovel?.numberOfChapters} chapters</strong>
                                </div>
                                <div className="flex flex-col">
                                    <span>licensed from</span>
                                    <strong>unknown</strong>
                                </div>
                            </div>
                            <div className="flex justify-start gap-1 flex-wrap">
                                {dataNovel &&
                                    dataNovel?.genres?.map(item => (
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
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Translated by: {dataNovel && dataNovel?.translator}</p>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Edited by: unknown</p>
                        </div>
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5">
                            <div className="text-start text-xl font-semibold outline-none capitalize dark:text-stone-200">
                                Reviews
                            </div>
                            {user?.id && addReview}
                            <div className="flex w-full justify-between items-center">
                                <div className="inline-flex items-end capitalize font-medium text-3xl">
                                    <BigThumbUpIcon series={true} />
                                    <span className="font-bold">{dataNovel && Math.floor(dataNovel?.recommendationRatio * 100)} %</span>
                                    <span className="capitalize text-gray-600 text-xl ml-2 font-bold dark:text-stone-200">{dataNovel && dataNovel?.totalReviews} reviews</span>
                                </div>
                                {reviewsModal}
                            </div>
                            {reviewsToRender}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="mx-4">
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5">
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
                                                <div className="bg-gray-100 dark:bg-stone-800 rounded-b-xl">
                                                    <div className="px-8 py-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                                                        {chaptersToRender}
                                                    </div>
                                                </div>
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