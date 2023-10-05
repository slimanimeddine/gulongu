import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useCommentReplyDislike(commentReplyId: number) {
    const queryClient = useQueryClient()

    const commentReplyDislike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/commentReplies/${commentReplyId}/dislike`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['commentReplies'] })
        }
    })

    return commentReplyDislike
}