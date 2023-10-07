import { INovel } from "@/types/novelType";
import { IReview } from "@/types/reviewType";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

interface IFilteredFieldsIndex {
    genre: string,
    id: number,
    synopsis: string,
    title: string,
    slug: string,
    likes: number
}

interface IFilteredFieldsSeries {
    genres: string[],
    id: number,
    synopsis: string,
    title: string,
    slug: string,
    likes: number
}

export const filterFieldsIndex = (novel: INovel): IFilteredFieldsIndex => {
    return {
        id: novel.id,
        title: novel.title,
        synopsis: novel.synopsis,
        genre: novel.genres[0],
        slug: novel.slug,
        likes: novel.recommendationRatio
    }
}

export const filterFieldsSeries = (novel: INovel): IFilteredFieldsSeries => {
    return {
        id: novel.id,
        title: novel.title,
        synopsis: novel.synopsis,
        genres: novel.genres,
        slug: novel.slug,
        likes: novel.recommendationRatio
    }
}

export const filterReview = (review: IReview, user_id: number) => {
    return {
        reviewId: review.id,
        username: review.authorUsername,
        date: `${dayjs().from(dayjs(review.created_at), true)} ago`,
        rating: review.isRecommended === 1 ? "recommended" : "not recommended",
        content: review.content,
        likes: review.likes,
        dislikes: review.dislikes,
        replies: review.numberOfReplies,
        user_id
    }
}