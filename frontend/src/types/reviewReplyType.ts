export interface IReviewReply {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    review_id: number;
    content: string;
    authorUsername: string;
}
