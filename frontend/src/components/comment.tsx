import Image from "next/image"
import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon, DislikesIcon, LikesIcon, UserCircle } from "./svgIcons"
import { useUser } from "@/hooks/useUser"
import { AddCommentReply } from "./addCommentReply"
import { useCommentReplies } from "@/hooks/useCommentReplies"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { Loading } from "./loading"
import { ServerError } from "./serverError"
import { useCommentLike } from "@/hooks/useCommentLike"
import { useCommentDislike } from "@/hooks/useCommentDislike"
import { useRedirect } from "@/hooks/useRedirect"
import { useCommentReplyDislike } from "@/hooks/useCommentReplyDislike"
import { useCommentReplyLike } from "@/hooks/useCommentReplyLike"
dayjs.extend(relativeTime)

interface CommentProps {
    imageSrc?: string,
    username: string,
    date: string,
    content: string,
    likes: number,
    dislikes: number,
    comment_id: number
}

interface CommentReplyProps {
    imageSrc?: string,
    username: string,
    date: string,
    content: string,
    likes: number,
    dislikes: number,
    commentReply_id: number
}

function CommentReply({
    imageSrc,
    username,
    date,
    content,
    likes,
    dislikes,
    commentReply_id
}: CommentReplyProps) {
    const commentReplyLike = useCommentReplyLike(commentReply_id)
    const commentReplyDislike = useCommentReplyDislike(commentReply_id)
    const { redirectTo } = useRedirect()
    const { data: user } = useUser()

    const likeCommentReply = () => {
        if (!user?.id) {
            redirectTo('/login')
        }
        commentReplyLike.mutate()
    }

    const dislikeCommentReply = () => {
        if (!user?.id) {
            redirectTo('/login')
        }
        commentReplyDislike.mutate()
    }

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
                    <button
                        className="flex hover:text-blue-500"
                        onClick={likeCommentReply}
                    >
                        <LikesIcon />
                        <span>{likes}</span>
                    </button>
                    <button
                        className="flex hover:text-blue-500"
                        onClick={dislikeCommentReply}
                    >
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
    comment_id
}: CommentProps) {
    const [show, setShow] = useState(false)
    const { redirectTo } = useRedirect()
    const commentLike = useCommentLike(comment_id)
    const commentDislike = useCommentDislike(comment_id)
    const { data: user } = useUser()
    const [reply, setReply] = useState(false)
    const [viewReplies, setViewReplies] = useState(false)

    const {
        data,
        isLoading,
        isError,
        error
    } = useCommentReplies(comment_id, viewReplies)

    let commentRepliesToRender

    if (data) {
        commentRepliesToRender = data.length > 0 
        ? commentRepliesToRender = data?.map(item => ({
            username: item.authorUsername,
            date: `${dayjs().from(dayjs(item.created_at), true)} ago`,
            content: item.content,
            likes: item.likes,
            dislikes: item.dislikes,
            commentReply_id: item.id
        }))
            .map(item => (
                <CommentReply key={item.commentReply_id} {...item} />
            ))
            : "No replies yet!"
    }

    if (isLoading) {
        commentRepliesToRender = <Loading />
    }

    if (isError) {
        commentRepliesToRender = <ServerError message={error?.message ?? "can't find resource"} />
    }

    const likeComment = () => {
        if (!user?.id) {
            redirectTo('/login')
        }
        commentLike.mutate()
    }

    const dislikeComment = () => {
        if (!user?.id) {
            redirectTo('/login')
        }
        commentDislike.mutate()
    }

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
                    <button
                        className="flex hover:text-blue-500"
                        onClick={likeComment}
                    >
                        <LikesIcon />
                        <span>{likes}</span>
                    </button>
                    <button
                        className="flex hover:text-blue-500"
                        onClick={dislikeComment}
                    >
                        <DislikesIcon />
                        <span>{dislikes}</span>
                    </button>
                    {user?.id && <button onClick={() => setReply(!reply)} className="font-medium hover:text-blue-500">Reply</button>}
                </div>
                <div className="my-2 w-full">
                    {reply && <AddCommentReply comment_id={comment_id} />}
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
                                {commentRepliesToRender}
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}