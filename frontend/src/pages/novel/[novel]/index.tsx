import Head from "next/head";
import { useState } from "react"
import { Tab, Popover, Disclosure } from '@headlessui/react'
import { NovelInfos } from "@/components/novelInfos";
import { Review, type ReviewProps, ReviewsModal } from "@/components/review";
import { BigThumbUpIcon, CaretDownIcon, CaretUpIcon, ChevronDownIcon, ChevronUpIcon } from "@/components/svgIcons";

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Novel() {
    const [sort, setSort] = useState("newest")

    const novelReview = {
        username: "Hexflex445",
        date: "4 years ago",
        rating: "recommended",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        likes: 44,
        dislikes: 12,
        replies: 5,
        reviewReplies: [
            {
                username: "AFroYY",
                date: "2 years ago",
                content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected"
            },
            {
                username: "AFroYY",
                date: "2 years ago",
                content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected"
            },
            {
                username: "AFroYY",
                date: "2 years ago",
                content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected"
            },
            {
                username: "AFroYY",
                date: "2 years ago",
                content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected"
            },
            {
                username: "AFroYY",
                date: "2 years ago",
                content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected"
            },
        ]
    }

    const reviews = Array(5).fill(novelReview)

    const novelInfos = {
        title: "keyboard immortal",
        rating: 77,
        author: "gu long",
        translator: "deathblade",
        synopsis: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem",
        nbReviews: 40,
        percLikes: 78,
        reviews
    }

    return (
        <>
            <Head>
                <title>A Record of a Mortal&#x27;s Journey to Immortality: Immortal Realm | Gulongu</title>
                <meta property="og:title" content="A Record of a Mortal's Journey to Immortality: Immortal Realm | Gulongu" key="title" />
            </Head>
            <div className="flex justify-center items-center bg-zinc-100 dark:bg-stone-800">
                <NovelInfos {...novelInfos} viewAll={false} />
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
                                    <strong>7 chapters</strong>
                                </div>
                                <div className="flex flex-col">
                                    <span>licensed from</span>
                                    <strong>zongheng</strong>
                                </div>
                            </div>
                            <div className="flex justify-start gap-1 flex-wrap">
                                {
                                    ["fantasy", "action", "drama", "harem", "xianxia"].map(item => (
                                        <div key={item} className="px-4 py-1 capitalize text-sm font-medium rounded-md border  hover:text-sky-500 hover:border-sky-500 hover:cursor-pointer dark:text-gray-200 dark:hover:text-sky-500">{item}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5 border-b border-stone-300">
                            <div className="text-start text-xl font-semibold outline-none capitalize dark:text-stone-200">
                                Details
                            </div>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Written by On Azure Phoenix Peak (青鸾峰上)</p>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Translated by: Coca and Corliss</p>
                            <p className="text-gray-600 dark:text-stone-200 capitalize">Edited by: Veela</p>
                        </div>
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5">
                            <div className="text-start text-xl font-semibold outline-none capitalize dark:text-stone-200">
                                Reviews
                            </div>
                            <div className="flex w-full justify-between items-center">
                                <div className="inline-flex items-end capitalize font-medium text-3xl">
                                    <BigThumbUpIcon series={true} />
                                    <span className="font-bold">{novelInfos.percLikes} %</span>
                                    <span className="capitalize text-gray-600 text-xl ml-2 font-bold dark:text-stone-200">{novelInfos.nbReviews} reviews</span>
                                </div>
                                <ReviewsModal {...{
                                    viewAll: true,
                                    nbReviews: novelInfos.nbReviews,
                                    percLikes: novelInfos.percLikes,
                                    reviews: novelInfos.reviews as ReviewProps[]
                                }} />
                            </div>
                            {reviews.slice(0, 3).map((item, i) => (
                                <Review {...item} key={i} />
                            ))}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="mx-4">
                        <div className="max-w-4xl py-5 mx-auto flex flex-col justify-between items-start gap-5">
                            <div className="flex w-full justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="capitalize text-gray-600 font-medium dark:text-gray-200">latest chapter</span>
                                    <div className="inline-flex items-center gap-1">
                                        <span className="capitalize text-lg font-bold">chapter 245</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-200">a year ago</span>
                                    </div>
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
                                                    <button onClick={() => setSort("newest")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">newest</button>
                                                    <button onClick={() => setSort("oldest")} className="capitalize text-left text-md px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-stone-600">oldest</button>
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
                                            <Disclosure.Button className="flex justify-between items-center w-full gap-3 p-4">
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
                                            <Disclosure.Panel className="bg-gray-100 dark:bg-stone-800 rounded-b-xl">
                                                <div className="px-8 py-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                                                    <div className="flex flex-col border-b border-gray-400 pb-2 hover:bg-gray-200 dark:hover:bg-stone-700">
                                                        <span className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">chapter 1</span>
                                                        <span className="text-sm text-gray-400 dark:text-gray-300">2021.08.18</span>
                                                    </div>
                                                    <div className="flex flex-col border-b border-gray-400 pb-2 hover:bg-gray-200 dark:hover:bg-stone-700">
                                                        <span className="text-lg font-semibold capitalize text-gray-700 dark:text-gray-200">chapter 1</span>
                                                        <span className="text-sm text-gray-400 dark:text-gray-300">2021.08.18</span>
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