import axios from "@/lib/axios"
import { ICommentReply } from "@/types/commentReplyType"
import { AxiosError } from "axios"
import { useQuery } from "react-query"

export const useCommentReplies = (commentId: number, enabled: boolean) => {
    const { data, isLoading, isError, error } = useQuery<{ commentReplies: ICommentReply[] }, AxiosError>({
        queryKey: `/commentReplies/${commentId}`,
        queryFn: () => {
            return axios
                .get(`/api/commentReplies/${commentId}`)
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