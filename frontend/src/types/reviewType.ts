export interface IReview {
    id: number;
    created_at: string;
    updated_at: string;
    novel_id: number;
    user_id: number;
    isRecommended: number;
    content: string;
    likes: number;
    dislikes: number;
    authorUsername: string;
    novelSlug: string;
    numberOfReplies: number;
}
