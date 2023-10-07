import { IChapter } from "./chapterType"
import { IReview } from "./reviewType"

export interface INovelReviewsChapter {
    id: number,
    updated_at: string,
    created_at: string,
    title: string,
    slug: string,
    translator: string,
    synopsis: string,
    genres: string[],
    numberOfChapters: number
    totalReviews: number,
    totalRecommendations: number,
    recommendationRatio: number,
    reviews: IReview[],
    chapters: Omit<IChapter, "content">[]
}