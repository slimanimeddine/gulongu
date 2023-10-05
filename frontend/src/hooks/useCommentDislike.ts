import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useCommentDislike(commentId: number) {
    const queryClient = useQueryClient()

    const commentDislike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/comments/${commentId}/dislike`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

    return commentDislike
}