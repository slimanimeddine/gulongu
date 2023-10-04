import axios from "@/lib/axios";
import { useMutation } from "react-query";

export function useReviewDislike(reviewId: number) {
    const reviewDislike = useMutation({
        mutationFn: () => {
            return axios.put(`/api/reviews/${reviewId}/dislike`)
        }
    })

    return reviewDislike
}