export interface ICommentReply {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    comment_id: number;
    content: string;
    authorUsername: string;
    likes: number;
    dislikes: number
}
