import Image from "next/image"
import { Dialog, Transition, Popover } from '@headlessui/react'
import { useState, Fragment } from "react"
import { BigThumbUpIcon, CaretDownIcon, CaretUpIcon, ChevronDownIcon, ChevronUpIcon, DislikesIcon, LikesIcon, RepliesIcon, ThumbUpIcon, UserCircle, XIcon } from "./svgIcons"
import { useReviewReplies } from "@/hooks/useReviewReplies"
import dayjs from "dayjs"
import { Loading } from "./loading"
import { ServerError } from "./serverError"
import relativeTime from "dayjs/plugin/relativeTime"
import { useQueryClient } from "react-query"
dayjs.extend(relativeTime)

interface ReviewReplyProps {
    imageSrc?: string,
    username: string,
    date: string,
    content: string
}

function ReviewReply({
    imageSrc,
    username,
    date,
    content
}: ReviewReplyProps) {
    return (
        <div className="flex gap-3 rounded-xl">
            {
                imageSrc
                    ? <Image
                        src={imageSrc}
                        width={50}
                        height={50}
                        alt=""
                    />
                    : <div>
                        <UserCircle width={50} height={50} />
                    </div>
            }
            <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <span className="font-bold text-md">{username}</span>
                    <span className="text-sm">{date}</span>
                </div>
                <div className="flex flex-col">
                    <p className="p-4 rounded-md bg-gray-100 dark:bg-stone-500">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}

interface ReviewRepliesModalProps {
    replies: number,
    imageSrc?: string,
    username: string,
    date: string,
    rating: string,
    content: string,
    likes: number,
    dislikes: number,
    reviewId: number,
}

function ReviewRepliesModal({
    replies,
    imageSrc,
    username,
    date,
    rating,
    content,
    likes,
    dislikes,
    reviewId,
}: ReviewRepliesModalProps) {
    const [show, setShow] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const {
        data,
        isLoading,
        isError,
        error
    } = useReviewReplies(reviewId, show)

    let reviewRepliesToRender

    if (data?.reviewReplies) {
        const reviewRepliesArr = data.reviewReplies.map(item => ({
            username: item.authorUsername,
            date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
            content: item.content,
            id: item.id
        }))

        reviewRepliesToRender = reviewRepliesArr.map(item => {
            const { id, ...rest } = item
            return <ReviewReply key={id} {...rest} />
        })
    }

    if (isLoading) {
        reviewRepliesToRender = <Loading />
    }

    if (isError) {
        reviewRepliesToRender = <ServerError message={error?.message ?? "can't find resource"} />
    }

    return (
        <>
            <button
                className="flex hover:text-blue-500"
                onClick={openModal}
            >
                <RepliesIcon />
                <span>{replies}</span>
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform rounded-md bg-white text-left align-middle shadow-xl transition-all dark:bg-stone-700">
                                    <div className="flex justify-between p-4 items-center rounded-md sticky top-0 z-40 bg-white dark:bg-stone-700">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold capitalize"
                                        >
                                            review details
                                        </Dialog.Title>
                                        <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-stone-500">
                                            <XIcon />
                                        </button>
                                    </div>
                                    <div className="flex flex-col px-4 gap-6 pb-6 h-[500px] overflow-auto">
                                        <div className="flex gap-3 p-4 shadow-md shadow-slate-300 rounded-xl border">
                                            {
                                                imageSrc
                                                    ? <Image
                                                        src={imageSrc}
                                                        width={50}
                                                        height={50}
                                                        alt=""
                                                    />
                                                    : <div>
                                                        <UserCircle width={50} height={50} />
                                                    </div>
                                            }
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-md">{username}</span>
                                                    <span className="text-sm">{date}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex">
                                                        <ThumbUpIcon series={true} />
                                                        <span className="font-bold text-md capitalize italic">{rating}</span>
                                                    </div>
                                                    <p className={`${show ? "line-clamp-0" : "line-clamp-2"} text-gray-600 dark:text-stone-200`}>
                                                        {content}
                                                    </p>
                                                    {
                                                        show ?
                                                            (
                                                                <button onClick={() => setShow(false)} className="inline-flex items-center text-gray-600 dark:text-stone-200">
                                                                    <strong>Show less</strong>
                                                                    <ChevronUpIcon />
                                                                </button>

                                                            ) :
                                                            (
                                                                <button onClick={() => setShow(true)} className="inline-flex items-center text-gray-600 dark:text-stone-200">
                                                                    <strong>Show more</strong>
                                                                    <ChevronDownIcon />
                                                                </button>
                                                            )
                                                    }
                                                </div>
                                                <div className="flex gap-2 text-gray-600 dark:text-stone-200">
                                                    <button className="flex hover:text-blue-500">
                                                        <LikesIcon />
                                                        <span>{likes}</span>
                                                    </button>
                                                    <button className="flex hover:text-blue-500">
                                                        <DislikesIcon />
                                                        <span>{dislikes}</span>
                                                    </button>
                                                    <div
                                                        className="flex"
                                                    >
                                                        <RepliesIcon />
                                                        <span>{replies}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {reviewRepliesToRender}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export interface ReviewProps {
    imageSrc?: string,
    username: string,
    date: string,
    rating: string,
    content: string,
    likes: number,
    dislikes: number,
    replies: number,
    reviewId: number
}

export function Review({
    imageSrc,
    username,
    date,
    rating,
    content,
    likes,
    dislikes,
    replies,
    reviewId
}: ReviewProps) {
    const [show, setShow] = useState(false)

    const reviewRepliesProps = {
        replies,
        imageSrc,
        username,
        date,
        rating,
        content,
        likes,
        dislikes,
        reviewId
    }

    return (
        <div className="flex gap-3 p-4 shadow-md shadow-slate-300 rounded-xl border">
            {
                imageSrc
                    ? <Image
                        src={imageSrc}
                        width={50}
                        height={50}
                        alt=""
                    />
                    : <div>
                        <UserCircle width={50} height={50} />
                    </div>
            }
            <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <span className="font-bold text-md">{username}</span>
                    <span className="text-sm">{date}</span>
                </div>
                <div className="flex flex-col">
                    <div className={rating === "recommended" ? "flex text-green-600" : "flex text-red-600"}>
                        <ThumbUpIcon series={true} />
                        <span className="font-bold text-md capitalize italic">{rating}</span>
                    </div>
                    <p className={`${show ? "line-clamp-0" : "line-clamp-2"} text-gray-600 dark:text-stone-200`}>
                        {content}
                    </p>
                    {
                        show ?
                            (
                                <button onClick={() => setShow(false)} className="inline-flex items-center text-gray-600 dark:text-stone-200">
                                    <strong>Show less</strong>
                                    <ChevronUpIcon />
                                </button>

                            ) :
                            (
                                <button onClick={() => setShow(true)} className="inline-flex items-center text-gray-600 dark:text-stone-200">
                                    <strong>Show more</strong>
                                    <ChevronDownIcon />
                                </button>
                            )
                    }
                </div>
                <div className="flex gap-2 text-gray-600 dark:text-stone-200">
                    <button className="flex hover:text-blue-500">
                        <LikesIcon />
                        <span>{likes}</span>
                    </button>
                    <button className="flex hover:text-blue-500">
                        <DislikesIcon />
                        <span>{dislikes}</span>
                    </button>
                    <ReviewRepliesModal {...reviewRepliesProps} />
                </div>
            </div>
        </div>
    )
}

export interface ReviewsModalProps {
    viewAll: boolean,
    nbReviews: number,
    percLikes: number,
    reviews: ReviewProps[],
    novelSlug: string,
    sort: "newest" | "oldest",
    setSort: React.Dispatch<React.SetStateAction<"newest" | "oldest">>
}

export function ReviewsModal({
    viewAll,
    nbReviews,
    percLikes,
    reviews,
    novelSlug,
    sort,
    setSort
}: ReviewsModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const queryClient = useQueryClient()

    return (
        <>
            {
                viewAll
                    ? <button
                        className="capitalize text-blue-600 text-md ml-2 font-semibold hover:underline hover:underline-offset-1"
                        onClick={openModal}
                    >
                        view all
                    </button>
                    : <button
                        className="hover:underline hover:underline-offset-1"
                        onClick={openModal}
                    >
                        {nbReviews} reviews
                    </button>
            }
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform rounded-md bg-white text-left align-middle shadow-xl transition-all dark:bg-stone-700">
                                    <div className="flex justify-between p-4 items-center rounded-md sticky top-0 z-40 bg-white dark:bg-stone-700">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold capitalize"
                                        >
                                            all reviews
                                        </Dialog.Title>
                                        <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-stone-500">
                                            <XIcon />
                                        </button>
                                    </div>
                                    <div className="flex flex-col px-4 gap-6 pb-6 h-[500px] overflow-auto">
                                        <div className="flex w-full justify-between items-center">
                                            <div className="inline-flex items-end capitalize font-medium text-3xl">
                                                <BigThumbUpIcon series={true} />
                                                <span className="font-bold">{percLikes}%</span>
                                                <span className="capitalize text-gray-600 text-xl ml-2 font-bold dark:text-stone-200">{nbReviews} reviews</span>
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
                                                                    queryClient.invalidateQueries(`/reviews/${novelSlug}/${sort}`, { exact: true })
                                                                }} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">newest</button>
                                                                <button onClick={() => {
                                                                    setSort("oldest")
                                                                    queryClient.invalidateQueries(`/reviews/${novelSlug}/${sort}`, { exact: true })
                                                                }} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">oldest</button>
                                                            </div>
                                                        </Popover.Panel>
                                                    </>
                                                )}
                                            </Popover>
                                        </div>
                                        {reviews.map(item => (
                                            <Review {...item} key={item.reviewId} />
                                        ))}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}