import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useReviewDislike(reviewId: number) {
    const queryClient = useQueryClient()

    const reviewDislike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/reviews/${reviewId}/dislike`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] })
        }
    })

    return reviewDislike
}