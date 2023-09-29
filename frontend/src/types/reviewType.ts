export interface IReview {
    authorUsername: string;
    content: string;
    created_at: string;
    dislikes: number;
    id: number;
    isRecommended: number;
    likes: number;
    novelSlug: string;
    novel_id: number;
    updated_at: string;
    user_id: number;
    numberOfReplies: number;
}
