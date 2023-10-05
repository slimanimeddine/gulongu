import axios from "@/lib/axios"
import { IComment } from "@/types/commentType";
import { AxiosError } from "axios";
import { useQuery } from "react-query"

export const useChapterComments = (chapterSlug: string, sort: string) => {
    const { data, isLoading, isError, error } = useQuery<{ comments: IComment[] }, AxiosError>(['comments', chapterSlug], () => {
        return axios
            .get(`/api/comments/${chapterSlug}/${sort}`)
            .then(res => res.data)
            .then(err => err)
    })

    return {
        data,
        isLoading,
        isError,
        error
    }
}