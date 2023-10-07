import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useReviewLike(reviewId: number, novelSlug: string) {
    const queryClient = useQueryClient()

    const reviewLike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/reviews/${reviewId}/like`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', novelSlug] })
        }
    })

    return reviewLike
}