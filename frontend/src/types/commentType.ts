export interface IComment {
    id: number;
    created_at: string;
    updated_at: string;
    chapter_id: number;
    user_id: number;
    content: string;
    likes: number;
    dislikes: number;
    authorUsername: string;
    chapterSlug: string;
}
