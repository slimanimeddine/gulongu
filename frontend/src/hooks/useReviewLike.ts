import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export function useReviewLike(reviewId: number) {
    const queryClient = useQueryClient()

    const reviewLike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/reviews/${reviewId}/like`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] })
        }
    })

    return reviewLike
}