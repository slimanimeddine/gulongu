import Image from "next/image"
import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon, DislikesIcon, LikesIcon, UserCircle } from "./svgIcons"

interface CommentProps {
    imageSrc?: string,
    username: string,
    date: string,
    content: string,
    likes: number,
    dislikes: number,
    commentReplies: CommentReplyProps[]
}

interface CommentReplyProps {
    imageSrc?: string,
    username: string,
    date: string,
    content: string,
    likes: number,
    dislikes: number
}

function CommentReply({
    imageSrc,
    username,
    date,
    content,
    likes,
    dislikes
}: CommentReplyProps) {
    return (
        <div className="flex gap-3 rounded-xl">
            {
                imageSrc
                    ? <Image
                        src={imageSrc}
                        width={50}
                        height={50}
                        alt=""
                        className="rounded-md border border-black drop-shadow-xl self-start"
                    />
                    : <div>
                        <UserCircle width={50} height={50} />
                    </div>
            }
            <div className="flex flex-col items-start gap-1">
                <div className="flex flex-col">
                    <span className="font-bold text-md">{username}</span>
                    <span className="text-sm">{date}</span>
                </div>
                <div className="flex flex-col p-4 rounded-md bg-gray-100 dark:bg-stone-500">
                    <p>
                        {content}
                    </p>
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
                </div>
            </div>
        </div>
    )
}

export function Comment({
    imageSrc,
    username,
    date,
    content,
    likes,
    dislikes,
    commentReplies
}: CommentProps) {
    const [show, setShow] = useState(false)
    const [viewReplies, setViewReplies] = useState(false)
    return (
        <div className="flex gap-3 rounded-xl">
            {
                imageSrc
                    ? <Image
                        src={imageSrc}
                        width={50}
                        height={50}
                        alt=""
                        className="rounded-md border border-black drop-shadow-xl self-start"
                    />
                    : <div>
                        <UserCircle width={50} height={50} />
                    </div>
            }
            <div className="flex flex-col items-start gap-1">
                <div className="flex flex-col">
                    <span className="font-bold text-md">{username}</span>
                    <span className="text-sm">{date}</span>
                </div>
                <div className="flex flex-col p-4 rounded-md bg-gray-100 dark:bg-stone-500">
                    <p className={`${show ? "line-clamp-0" : "line-clamp-6"}`}>
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
                </div>
                {
                    viewReplies ?
                        (
                            <button onClick={() => setViewReplies(false)} className="inline-flex items-center capitalize text-blue-600 text-md font-semibold">
                                <span>hide replies</span>
                                <ChevronUpIcon />
                            </button>
                        ) :
                        (
                            <button onClick={() => setViewReplies(true)} className="inline-flex items-center capitalize text-blue-600 text-md font-semibold">
                                <span>view replies</span>
                                <ChevronDownIcon />
                            </button>
                        )
                }
                {
                    viewReplies && (
                        <>
                            <div className="flex flex-col gap-2">
                                {
                                    commentReplies.map(item => (
                                        <CommentReply {...item} key={item.content} />
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}