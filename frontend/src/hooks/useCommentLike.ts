import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useCommentLike(commentId: number) {
    const queryClient = useQueryClient()

    const commentLike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/comments/${commentId}/like`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

    return commentLike
}