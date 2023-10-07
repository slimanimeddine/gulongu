export interface INovel {
    id: number,
    title: string,
    slug: string,
    translator: string,
    genres: string[],
    synopsis: string,
    numberOfChapters: number
    updated_at: string,
    created_at: string,
    totalReviews: number,
    totalRecommendations: number,
    recommendationRatio: number,
}