import axios from "@/lib/axios";
import { useMutation } from "react-query";

export function useReviewLike(reviewId: number) {
    const reviewLike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/reviews/${reviewId}/like`)
        }
    })

    return reviewLike
}