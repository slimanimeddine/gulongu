import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useCommentReplyLike(commentReplyId: number) {
    const queryClient = useQueryClient()

    const commentReplyLike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/commentReplies/${commentReplyId}/like`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['commentReplies'] })
        }
    })

    return commentReplyLike
}