import axios from "@/lib/axios"
import { IReviewReply } from "@/types/reviewReplyType"
import { AxiosError } from "axios"
import { useQuery, useQueryClient } from "react-query"

export const useReviewReplies = (reviewId: number, enabled: boolean, novelSlug: string) => {
    const queryClient = useQueryClient()
    const { data, isLoading, isError, error } = useQuery<IReviewReply[], AxiosError>({
        queryKey: ['reviewReplies', reviewId],
        queryFn: () => {
            return axios
                .get(`/api/reviewReplies/${reviewId}`)
                .then(res => res.data)
                .then(err => err)
        },
        onSuccess:  () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', novelSlug] })
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