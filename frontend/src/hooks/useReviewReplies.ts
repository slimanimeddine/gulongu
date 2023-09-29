import axios from "@/lib/axios"
import { IReviewReply } from "@/types/reviewReplyType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useReviewReplies = (reviewId: number, enabled: boolean) => {
    const { data, isLoading, isError, error } = useQuery<{ reviewReplies: IReviewReply[] }, AxiosError>({
        queryKey: `/reviews/${reviewId}`,
        queryFn: () => {
            return axios
                .get(`/api/reviewReplies/${reviewId}`)
                .then(res => res.data)
                .then(err => err)
        },
        enabled
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}