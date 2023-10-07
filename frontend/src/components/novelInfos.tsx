import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ReviewsModal, type ReviewsModalProps } from "./review"
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, PhotoIcon, ThumbUpIcon } from "./svgIcons"

interface NovelInfosProps {
    imageSrc?: string,
    title: string,
    author: string,
    translator: string,
    synopsis: string,
    firstChapterUrl: string
}

export type NovelInfosPropsWithReviewsModalProps = NovelInfosProps & ReviewsModalProps

export function NovelInfos({
    imageSrc,
    firstChapterUrl,
    title,
    author,
    translator,
    synopsis,
    nbReviews,
    percLikes,
    viewAll,
    reviews,
    sortReviews,
    setSortReviews
}: NovelInfosPropsWithReviewsModalProps) {
    const [show, setShow] = useState(false)
    return (
        <div className="flex justify-center gap-6 max-w-4xl px-3 py-20 max-md:flex-col max-md:w-full">
            {
                imageSrc
                    ? <Image
                        src={imageSrc}
                        width={240}
                        height={350}
                        alt=""
                    />
                    : <div className="border border-black rounded-lg">
                        <PhotoIcon width={240} height={350} />
                    </div>
            }
            <div className="flex flex-col justify-start items-start gap-2 flex-1 max-md:justify-center">
                <h1 className="text-4xl font-bold capitalize">{title}</h1>
                <div className="inline-flex items-center capitalize font-medium text-xl">
                    <ThumbUpIcon series={true} />
                    <span className="">{percLikes}%</span>
                </div>
                <div className="inline-flex items-center capitalize font-medium text-xl">
                    <ReviewsModal {...{
                        viewAll,
                        nbReviews,
                        percLikes,
                        reviews,
                        sortReviews,
                        setSortReviews
                    }} />
                    <ChevronRightIcon />
                </div>
                <div className="flex flex-col text-gray-600 capitalize mb-9 dark:text-stone-200">
                    <span>author: <strong>{author}</strong></span>
                    <span>translator: <strong>{translator}</strong></span>
                    <p className={`${show ? "line-clamp-0" : "line-clamp-2"}`}>
                        <strong className="text-lg">synopsis:</strong> {synopsis}
                    </p>
                    {
                        show ?
                            (
                                <button onClick={() => setShow(false)} className="inline-flex items-center">
                                    <strong>Show less</strong>
                                    <ChevronUpIcon />
                                </button>
                            ) :
                            (
                                <button onClick={() => setShow(true)} className="inline-flex items-center">
                                    <strong>Show more</strong>
                                    <ChevronDownIcon />
                                </button>
                            )
                    }
                </div>
                <Link href={firstChapterUrl} className="bg-gradient-to-r from-blue-500 to-blue-700 text-white uppercase rounded-xl text-xl font-medium text-center py-4 w-80 max-md:w-full">start reading</Link>
            </div>
        </div>
    )
}