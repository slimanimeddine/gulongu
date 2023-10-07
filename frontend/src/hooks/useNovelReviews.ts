import axios from "@/lib/axios"
import { IReview } from "@/types/reviewType";
import { AxiosError } from "axios";
import { useQuery } from "react-query"

export const useNovelReviews = (novelSlug: string, sort: string) => {
    const { data, isLoading, isError, error, refetch, isRefetching, isRefetchError } = useQuery<IReview[], AxiosError>(['reviews', novelSlug, sort], () => {
        return axios
            .get(`/api/reviews/${novelSlug}/${sort}`)
            .then(res => res.data)
            .then(err => err)
    })

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        isRefetchError,
        isRefetching
    }
}